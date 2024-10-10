
---
date: 2023-05-10
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

mixins - can add columns to database

proxy - 2-3 sentences

## Assessments:
- Mixins:
	- assessment open
	- clean method:
		- given status set: certain things can or cannot happen
		- if you make new assessment, can’t publish without certain things
	- PubWorkflowModels
	- Know that there is going to be a lecture for X, but don’t know who is going do this lecture
		- don’t know when this is created
		- But should know when this is published, so this is required by the publishing point
		- DRI: directly responsible individual -
- Models:
	- Model docs through admin portal:
		- [http://rXX:8000/admin/doc/models/](http://rxx:8000/admin/doc/models/)

- Brit review:
	- many models for handling 
	- assessment: there is a flask assessment
	- assessment session: for each cohort 
		- That’s what ties the submission 
	- Start of semester create a “iou” submission for each of these assessments


## Testing in sis:

- Run tests:
```shell
$ python manage.py test --keepdb --settings=sis.settings.testing
```

- Running tests for specific sub-directories
```shell
$ python mange.py test --keepdb --settings=sis.settings.testing staff students
```


##### SetupTestData

- found in each of the ModelTestCase (s)
	- only runs 1x b/c class method
- Calls the factory classes
	- provide instances of the data needed for tests

#### Class Meta
- get_or_create: prevents duplication

### Class Param
- get up params that alter bx of some fields

#### SubFactories
- used to create instances of a model within a factory
- nice b/c if you are creating tests for this
	- don’t need to create separate instances for project and cohort, everything is created behind the scenes 
- LazyAttribute: used for certain fields that may rely on other fields (start_at to end_at, used within end_at)
- LazyFunction NOT the same thing (heads up)

#### Fuzzy
- creates realistic models with fake information
- FuzzyDateTime - generates timezone aware date

#### Faker
- creates fake data for data fields
	- pass in string
	- takes that string and deduce what kind of thing to provide


- assessment submission
- SubFactory:
	- if you need to test an assessment submission
		- need an assessment, therefore need a course, and cohort, and a student, etc. 
	- FactoryBoy automatically goes and creates all dependencies needed for testing that one thing
		- recursive dependencies
	- Allows each developer to focus on their area without needing to know all the models and each dependency
- Faker
	- fakedevdatabase



## Curriculum

Lecture vs lectures session
exercise vs exercise session


## API

- REST Framework Library
- api files from each directory
	- imported into 
- ViewSets:
	- robust classes
- Browsable API
	- 