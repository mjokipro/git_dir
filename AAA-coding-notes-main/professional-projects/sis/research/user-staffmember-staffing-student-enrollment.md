
---
date: 2023-05-10
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

**Relationships 
-   User Class (users.User)
	-   Proxy model - Student (subclass)
	-   Proxy model - StaffMember (subclass)

-   Student Class (students.Student)
	-   (same as shown in Enrollment Class below)

-   Enrollment Class (students.Enrollment)
	-   student (students.Student)
		-   One Student to many Enrollment
			-   Must be student to enroll
			-   Student can be in private prep and then bootcamp
			-   Student can be in one cohort, but then defer to later cohort
	-   application (apply.Application) 
		-   (not going to work on this area for this project)
	-   cohort (courses.Cohort) 
		-   One Cohort to many Enrollment
	-   adviser (staff.StaffMember) 
		-   One StaffMember (as adviser) to many Enrollment
	-   default_grader (staff.Staffmember)
		-   One StaffMember (as default_grader) to many Enrollment
	-   projectsession (projects.ProjectSession) 
		-   One ProjectSession to many Enrollment
			-   (each enrollment is associated with 1 student, and there are many students on each professional project)
	-   computersetup (courses.ComputerSetup) 
	-   buddy (students.Buddy) 
	-   left_new_cohort (courses.Cohort) 

-   StaffMember Class
	-   One StaffMember to many Staffing
		-   StaffMember can be staffed on r28, then privateprep48, then r30, etc.
	-   One StaffMember to many dri (assessments.Assessment)
		-   StaffMember can ‘own’ many assessments

-   Staffing Class
	-   (same as shown in StaffMember above)


**High-level Overview of User, Student, Staff apps**

- User

-   Models
    

-   LearnedAboutRithmChoices
    
-   EducationLevel
    
-   Continent
    
-   User - largest
    
-   Comment
    
-   Communication
    

-   Views
    

-   UserDetailView - largest
    
-   UserBaseUpdateView
    

-   UserEditNamesView
    
-   UserEditAboutView
    
-   UserEditContactView
    
-   UserEditEmergencyView
    
-   UserEditSocialMediaView
    
-   UserEditCareerView
    

-   WelcomeSetPasswordView
    
-   SSNUpdateView
    

-   Urls
    

-   User welcome
    
-   User detail
    
-   Many user edits for each section
    

-   Factories
    

-   UserFactory - for creating test users
    
-   CommentFactor
    
-   Communication
    
-   _FakeUser
    
-   FakeUserMan
    
-   FakeUserWoman
    
-   FakeUserEnby
    
-   QUESTIONS:
    

-   What’s the difference between UserFactory and making FakeUsers? 
    

-   Admin 
    

-   CommentInline
    
-   UserAdminCommentInline
    
-   UserAdmin
    
-   CommentAdmin
    
-   CommunicationAdmin
    

-   Forms
    

-   UserAdminForm
    
-   UserEditContactForm
    
-   CommentAdminForm
    
-   CommentForm
    
-   CommentUpdateForm
    
-   SSNUpdateForm
    

-   Mail
    

-   Send welcome emails
    

  

  

  

  

Student

-   Models 
    

-   StudentManager
    
-   Student (largest one) 
    
-   Buddy (one to one relation to User) 
    

-   Views 
    

-   StudentListView
    
-   StaffStudentListView
    
-   EnrollmentTrascriptView
    
-   EnrollStudentView
    
-   EnrollmentIntakeView
    

-   URLs: 
    

-   5 paths 
    

-   Factories: 
    

-   StudentFactory 
    
-   EnrollmentFactory
    
-   BuddyFactory
    
-   FakeEnrollment 
    

-   Admin: 
    

-   StudentAdmin
    
-   EnrollmentAdmin
    
-   BuddyAdmin
    

-   Forms: 
    

-   StaffStudentForm
    
-   EnrollmentForm 
    
-   EnrollStudentForm 
    
-   UserEditContactForm 
    
-   EnrollmentIntakeForm 
    

-   Apps: 
    

-   StudentSearchAdapter 
    
-   StudentsConfig
    

-   Workflow: 
    

-   EnrollmentWorkflow 
    

-   API: 
    

-   EnrollmentViewSet 
    

  

Staff

-   Models 
    

-   StaffManager 
    
-   StaffMember 
    
-   Staffing 
    

-   Views 
    

-   StaffListView 
    
-   StaffDetailView
    
-   UpcomingDriReportView
    

-   URLs: 
    

-   Same as views 
    

-   Factories: 
    

-   StaffMemberFactory 
    
-   StaffingFactory
    
-   FakeStaffing
    

-   Admin: 
    

-   StaffingInline 
    
-   StaffMemberAdmin
    

-   Forms: 
    

-   NONE 
    

-   Apps: 
    

-   StaffSearchAdapter
    
-   StaffConfig 
    

-   Workflow: 
    
-   API: 
    

-   StaffMemberViewSet**