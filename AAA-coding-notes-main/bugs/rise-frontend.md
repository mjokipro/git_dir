
---
date: 2023-07-19
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: []
---

1. d 
2. d
3. Added useEffects for when Jobs change, refetch skills list, or when skills list updates, filter through selectedSkills to remove any from the selected list that are no longer visible skills
	1. Now problem only when *unselecting* a job, removes *all* selected skills
	2. Also want all related skills list to populate on first render


```js
[](<import { ChangeEvent, FormEvent, useContext, useEffect, useReducer, useState } from 'react';
import { Divider, Flex, Heading, Text, Spinner, Stack, StackItem } from '@chakra-ui/react';
import { Credit, WPItem } from '../lib/classes';
import { EditProfileContext } from '../context/EditProfileContext';
import usePositions from '../hooks/queries/usePositions';
import useRelatedSkills from '../hooks/queries/useRelatedSkills';
import useLazyPositions from '../hooks/queries/useLazyPositions';
import useLazyRelatedSkills from '../hooks/queries/useLazyRelatedSkills';
import useUpdateCredit from '../hooks/mutations/useUpdateCredit';
import ProfileCheckboxGroup from '../components/common/ProfileCheckboxGroup';
import TextInput from '../components/common/inputs/TextInput';
import ProfileRadioGroup from '../components/common/ProfileRadioGroup';
import EditCreditButtons from '../components/EditCreditButtons';
import { sortWPItemsByName } from '../lib/utils';

// TODO type this reducer
function editCreditReducer(state: Credit, action: { type: string; payload: any }) {
	console.log("editCreditReducer called with state = ", state, "action = ", action);

  switch (action.type) {
		case 'UPDATE_INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};

		case 'UPDATE_DEPARTMENT':
			return {
				...state,
				positions: {
					...state.positions,
					department: action.payload.value.map((item: number) =%3E item),
				},
			};

		case 'UPDATE_JOBS':
			return {
				...state,
				positions: {
					...state.positions,
					jobs: action.payload.value.map((item: number) => item),
				},
        // FIXME AD: find & iterate over skills here, so only skills selected that also align with job are saved
        // skills: state.skills.filter((skill)=> {
        //   const [relatedSkills, queryResult] = useRelatedSkills(updatedJobs);
        //   return relatedSkills.map((skill) => skill.id).includes(skill);
        // }),
			};

    case 'UPDATE_JOBS_AND_SKILLS':
        return {
          ...state,
          skills: action.payload.value.skills.map((item: number) => item),
          positions: {
            ...state.positions,
            jobs: action.payload.value.jobs.map((item: number) => item),
          },
          // FIXME AD: find & iterate over skills here, so only skills selected that also align with job are saved
          // skills: state.skills.filter((skill)=> {
          //   const [relatedSkills, queryResult] = useRelatedSkills(updatedJobs);
          //   return relatedSkills.map((skill) => skill.id).includes(skill);
          // }),
        };

		case 'UPDATE_SKILLS':
			return {
				...state,
				skills: action.payload.value.map((item: number) => item),
			};

		case 'INIT':
		case 'RESET':
			return action.payload;

		default:
			return state;
	}
}

interface Props {
	creditId: string;
	onClose: () => void;
}

export default function EditCreditView({ creditId, onClose: closeModal }: Props) {
	const { editProfile, editProfileDispatch } = useContext(EditProfileContext);
	const credit = editProfile.credits?.find((credit) => credit.id === creditId);
	const [editCredit, editCreditDispatch] = useReducer(editCreditReducer, credit);
  console.log("editCreditView component loaded with editCredit = ", editCredit);

	const {
		updateCreditMutation,
		results: { loading: updateCreditLoading },
	} = useUpdateCredit();

	const {
		title,
		jobTitle,
		jobLocation,
		venue,
		workStart,
		workEnd,
		workCurrent,
		positions: { department: selectedDepartmentIds = [], jobs: selectedJobIds = [] },
		skills: selectedSkills,
	} = editCredit;

	const [allDepartments] = usePositions();
	const [getJobs, { data: allJobs, loading: jobsLoading }] = useLazyPositions();
	const [jobs, setJobs] = useState%3CWPItem[]>([]);
  const [getRelatedSkills, { data: allRelatedSkills, loading: relatedSkillsLoading}] = useLazyRelatedSkills();
	// const [allRelatedSkills] = useRelatedSkills(selectedJobIds);
  const [skills, setSkills] = useState<WPItem[]>([]);

  const refetchJobs = async () => {
    if (selectedDepartmentIds.length === 0) return;

    const result = await getJobs({ variables: { departments: selectedDepartmentIds }, fetchPolicy: 'network-only' });

    console.log("result in refetchJobs = ", result);
    const jobsByDept = result?.data?.jobsByDepartments
    if (result?.data) {
      setJobs(jobsByDept.map((item: WPItem) => new WPItem(item)).sort(sortWPItemsByName));

      const allJobIds = jobsByDept.map((j: WPItem)=> j.id);
      const alignedSelectedJobIds = selectedJobIds.filter((jobId: number) => allJobIds.includes(jobId));
      console.log("allJobIds = ", allJobIds, "selectedJobIds = ", selectedJobIds);
      // editCreditDispatch({
      //   type: 'UPDATE_JOBS',
      //   payload: {
      //     value: alignedSelectedJobIds,
      //   },
      // });

      const skillsResult = await getRelatedSkills({ variables: { jobs: alignedSelectedJobIds }, fetchPolicy: 'network-only' });

      console.log("result in refetchSkills = ", skillsResult);
      const jobSkills = skillsResult?.data?.jobSkills
      if (skillsResult?.data) {
        setSkills(jobSkills.map((item: WPItem) => new WPItem(item)).sort(sortWPItemsByName));

        // filter & update selectedSkills to align with jobs
        const allRelatedSkillIds = jobSkills.map((s: WPItem)=> s.id);
        const alignedSelectedSkillIds = selectedSkills.filter((skillId: string) => {
           let isShowing = allRelatedSkillIds.includes(+skillId);
           console.log(skillId, "is included in allRelatedSkillIds = ", isShowing);
           return isShowing;
        });
        console.log("allRelatedSkillIds = ", allRelatedSkillIds, "selectedSkills = ", selectedSkills, "alignedSelectedSkillIds = ", alignedSelectedSkillIds);
        editCreditDispatch({
          type: 'UPDATE_JOBS_AND_SKILLS',
          payload: {
            value: {jobs: alignedSelectedJobIds, skills: alignedSelectedSkillIds},
          },
        });

    } else {
      return () => {
        setJobs([]);
        setSkills([]);
        }
      }
    }
  }

  const refetchSkills = async (jobIds: number[]) => {
    if (jobIds.length === 0) return;

    const result = await getRelatedSkills({ variables: { jobs: jobIds }, fetchPolicy: 'network-only' });

    console.log("result in refetchSkills = ", result);
    const jobSkills = result?.data?.jobSkills
    if (result?.data) {
      setSkills(jobSkills.map((item: WPItem) => new WPItem(item)).sort(sortWPItemsByName));

      // filter & update selectedSkills to align with jobs
      const allRelatedSkillIds = jobSkills.map((s: WPItem)=> s.id);
      console.log("allRelatedSkillId first item type = ", typeof allRelatedSkillIds[0])
      const alignedSelectedSkillIds = selectedSkills.filter((skillId: string) => {
        console.log("type of skilId in selectedSkills = ", typeof skillId);
        let isShowing = allRelatedSkillIds.includes(+skillId);
        console.log(skillId, "is included in allRelatedSkillIds = ", isShowing);
        return isShowing;
     });
     console.log("allRelatedSkillIds = ", allRelatedSkillIds, "selectedSkills = ", selectedSkills, "alignedSelectedSkillIds = ", alignedSelectedSkillIds);
     editCreditDispatch({
        type: 'UPDATE_SKILLS',
        payload: {
          value: alignedSelectedSkillIds,
        },
      });
    } else {
      return () => {
        setSkills([]);
      }
    }
  }

	// Refetch jobs list when department changes
	useEffect(() => {
    refetchJobs();
  }, [selectedDepartmentIds]);

// Use case: selectedDepartmentIds changes
// 1. fetch related jobs
// 2. update visible jobs
// 3. update selectedJobIds to filtered list that also appear in visible jobs
// 4. update visible skills based on new job list
// 5. update selectedSkills to filtered list that also appear in visible skills

	// // Set jobs when allJobs changes.
	// useEffect(() => {
  //   // FIXME: selectedSkills are lost when dept changes. Potential solution:
  //   // add async function here and retrieve data on jobs to update skills here,
  //   // instead of relying on the other useEffect
	// 	if (allJobs) {
	// 		setJobs(allJobs.jobsByDepartments.map((item: WPItem) => new WPItem(item)).sort(sortWPItemsByName));

  //     // filter & update selectedJobIds to align with departments
  //     const allJobIds = allJobs.jobsByDepartments.map((j: WPItem)=> j.id);
  //     const alignedSelectedJobIds = selectedJobIds.filter((jobId: number) => allJobIds.includes(jobId));
  //     console.log("allJobIds = ", allJobIds, "selectedJobIds = ", selectedJobIds);
  //     editCreditDispatch({
  //       type: 'UPDATE_JOBS',
  //       payload: {
  //         value: alignedSelectedJobIds,
  //       },
  //     });
	// 	}

	// 	return () => {
	// 		setJobs([]);
	// 	};
	// }, [allJobs]);

  // TODO: add another useEffect to update skills when selectedJobIds changes
// 1. fetch related skills

// Refetch skills list when jobs change
useEffect(() => {
  // if (selectedJobIds.length === 0) return;

  // getRelatedSkills({ variables: { jobs: selectedJobIds }, fetchPolicy: 'network-only' });
  refetchSkills(selectedJobIds);
}, [selectedJobIds]);

// TODO: add useEffect to setSkills when allRelatedSkills change
// 1. update visible skills
// 2. update selectedSkills to filtered list that also appear in visible skills

// Set skills when allRelatedSkills changes.
// useEffect(() => {
//   if (allRelatedSkills) {
//     console.log("allRelatedSkills = ", allRelatedSkills);
//     setSkills(allRelatedSkills.jobSkills.map((item: WPItem) => new WPItem(item)).sort(sortWPItemsByName));

//     // filter & update selectedSkills to align with jobs
//     const allRelatedSkillIds = allRelatedSkills.jobSkills.map((s: WPItem)=> s.id);
//     const alignedSelectedSkillIds = selectedSkills.filter((skillId: number) => allRelatedSkillIds.includes(skillId));
//     console.log("allRelatedSkillIds = ", allRelatedSkillIds, "selectedSkills = ", selectedSkills);
//     editCreditDispatch({
//       type: 'UPDATE_SKILLS',
//       payload: {
//         value: alignedSelectedSkillIds,
//       },
//     });
//   }

// 		return () => {
// 			setSkills([]);
// 		};
// 	}, [allRelatedSkills]);

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;

		editCreditDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value,
			},
		});
	};

  // dispatchCheckboxTermChange // can call for 3 diff functions
	const dispatchCheckboxTermChange = (name: string, terms: string[]) => {
		editCreditDispatch({
			type: `UPDATE_${name.toUpperCase()}`,
			payload: {
				value: terms,
			},
		});
	};

  const handleDepartmentsChange = (name: string) => (terms: string[]) => {
    console.log("handleDepartmentsChange called with name = ", name, "terms = ", terms)
    // Questions:
    // - How do I tell if a department is being checked or unchecked?
    // - How do I know what jobs are related to this department?
    // - How do I know what skills are related to the remaining jobs?

    // update departments
    dispatchCheckboxTermChange(name, terms);

    // // update jobs based on updated list of depts
    //   // estimate state by calling editCreditReducer manually
    // const action = {
		// 	type: `UPDATE_${name.toUpperCase()}`,
		// 	payload: {
		// 		value: terms,
		// 	}
    // }
    // const { positions } = editCreditReducer(editCredit, action);
    // const updatedDepts = positions.department;
    //   // make query to get related jobs
    // const [relatedJobs] = usePositions(updatedDepts);
    // const relatedJobIds = relatedJobs.map((j) => j.id);
    // const updatedJobIds = selectedJobIds.filter((jobId: number) => relatedJobIds.includes(jobId));
    // dispatchCheckboxTermChange("jobs", updatedJobIds)

    // // update skills based on updated list of jobs
    // const [relatedSkills] = useRelatedSkills(updatedJobIds);
    // const relatedSkillIds = relatedSkills.map((s) => s.id);
    // const updatedSkillIds = selectedSkills.filter((skillId: number) => relatedSkillIds.includes(skillId));
    // dispatchCheckboxTermChange("skills", updatedSkillIds);
  }


  const handleJobsChange = (name: string) => (terms: string[]) => {
    console.log("handleJobsChange called with name = ", name, "terms = ", terms)
    // update jobs
    dispatchCheckboxTermChange(name, terms);
    // update skills
  }

  const handleSkillsChange = (name: string) => (terms: string[]) => {
    console.log("handleSkillsChange called with name = ", name, "terms = ", terms)
    // update skills
    dispatchCheckboxTermChange(name, terms);
  }

	const handleRadioInputChange = (name: string) => (value: string) => {
		editCreditDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value: value === 'true' ? true : false,
			},
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const creditToUpdate = new Credit(editCredit).prepareCreditForGraphQL();

		updateCreditMutation(creditToUpdate, editCredit.id)
			.then((results) => {
				editProfileDispatch({
					type: 'UPDATE_CREDIT',
					payload: {
						credit: results.data.updateOrCreateCredit.updatedCredit,
						newCreditTempId: editCredit.isNew ? editCredit.id : null,
					},
				});

				closeModal();
			})
			.catch((err: any) => {
				console.error(err);
			});
	};

	const handleCancel = () => {
		closeModal();
		editCreditDispatch({
			type: 'RESET',
			payload: credit,
		});
	};

	return (
		<form id='edit-credit' onSubmit={handleSubmit}>
			<Flex flex='1' justifyContent='space-between' py={2}>
				<Heading as='h3' size='lg' lineHeight='base'>
					Edit Credit
				</Heading>
				<EditCreditButtons handleCancel={handleCancel} isLoading={updateCreditLoading} />
			</Flex>

			<TextInput
				name='title'
				label='Production/Show/Company Title'
				value={title}
				isRequired
				onChange={handleInputChange}
				flex='1'
			/>

			<TextInput
				name='jobTitle'
				label='Job/Position Title'
				isRequired
				value={jobTitle}
				onChange={handleInputChange}
			/>

			<Flex justifyContent='space-between' w='full' gap={4} flexWrap='wrap'>
				<TextInput
					name='workStart'
					label='Start year'
					isRequired
					value={workStart}
					onChange={handleInputChange}
					flex='1'
				/>

				<TextInput
					name='workEnd'
					label='End year'
					value={!workCurrent ? workEnd : ''}
					isDisabled={workCurrent}
					onChange={handleInputChange}
					flex='1'
				/>

				<ProfileRadioGroup
					defaultValue={workCurrent ? 'true' : 'false'}
					name='workCurrent'
					label='Currently working here'
					flex={{ base: '0 0 100%', md: '0 0 50%' }}
					items={[
						{ label: 'Yes', value: 'true' },
						{ label: 'No', value: 'false' },
					]}
					handleChange={handleRadioInputChange}
				/>
			</Flex>

			<Flex justifyContent='space-between' w='full' gap={4} flexWrap='wrap'>
				<TextInput
					name='venue'
					label='Venue'
					value={venue}
					onChange={handleInputChange}
					isRequired
					flex='1'
				/>

				<TextInput
					name='jobLocation'
					label='Job Location'
					value={jobLocation}
					isRequired
					onChange={handleInputChange}
					flex='1'
				/>
			</Flex>

			<Divider />

			<Stack direction='column' spacing={6} fontSize='md'>
				{/* TODO Make this required */}
				<StackItem>
					<Heading as='h4' variant='contentTitle'>
						Department
					</Heading>
					<Text>Select all department(s) you worked under.</Text>
					<ProfileCheckboxGroup
						name='department'
						items={allDepartments}
						checked={
							selectedDepartmentIds
								? selectedDepartmentIds.map((item: number) => item.toString())
								: []
						}
						handleChange={handleDepartmentsChange}
					/>
				</StackItem>
				<StackItem>
					<Heading as='h4' variant='contentTitle'>
						Position
					</Heading>
					{selectedDepartmentIds.length && !jobsLoading ? (
						<>
							<Text>Select all jobs you held on this project.</Text>
							<ProfileCheckboxGroup
								name='jobs'
								items={jobs}
								checked={selectedJobIds?.map((item: number) => item.toString())}
								handleChange={handleJobsChange}
							/>
						</>
					) : jobsLoading ? (
						<Spinner />
					) : null}
				</StackItem>

				<StackItem>
					<Heading as='h4' variant='contentTitle'>
						Skills
					</Heading>
					{selectedJobIds.length && !relatedSkillsLoading ? (
						<>
							<Text>Select any skills used on this job.</Text>
							<ProfileCheckboxGroup
								name='skills'
								items={skills}
								checked={selectedSkills?.map((item: number) => item.toString())}
								handleChange={handleSkillsChange}
							/>
						</>
					) : relatedSkillsLoading ? (
						<Spinner />
					) : null}
				</StackItem>
			</Stack>

			<Flex justifyContent='flex-end' mt={4} mb={0}>
				<EditCreditButtons handleCancel={handleCancel} isLoading={updateCreditLoading} />
			</Flex>
		</form>
	);
}>)
```