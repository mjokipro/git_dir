# Testing Presentation

# Testing in SIS

### Where are the tests located?

In the project directory:
- Under each sub-directory, there is a test folder that usually includes tests for admin.py, api.py, models.py, views.py. Some test folders include tests for other files as well.

### Running tests

Running all the tests (root directory)

`python manage.py test --keepdb --settings=sis.settings.testing`

Running specific tests

`python manage.py test --keepdb --settings=sis.settings.testing staff students`

Running tests for specific files

`python manage.py test --keepdb --settings=sis.settings.testing` +

    `students.tests.test_models` or
    `students.tests.test_models.StudentModelTestCase` or
    `students.tests.test_models.StudentModelTestCase.test_student_url`
    
Add `--pdb` to the end of testing scripts to enter pdb-mode if a test fails
    
To run coverage - this will open up a html file with a coverage report for each file in the sis directory

`./coverage`

## SetupTestData

a class method that is used to create instances of factories. It is at the top of every test case.

It can pass arguments to override model attributes of the factory

## Factories

Factories are part of the factory_boy library which provide a way to generate test data for django models. Factories should be in all models

They are used to work with ORMs and are helpful for easily testing objects whose class is defined in the models attribute (a set of attributes for application databases)

Factories are called to obtain specific model attributes and provide a convenient way to create instance of models with predefined or randomizerd data. They are used alongside Django testing to run tests against a temporary database without needing to use a mock database

## SubFactories
used to generate a field that require instance of other models. For instance, if an assessment factory needs to have a field of the specific cohort, it can set the cohort field by using the cohortFactory as a subfactory (inheritence)


### Class meta
A meta class is a class that creates and modifies classes. It is used to define metadata for a Django model, such as the database table name, ordering, and other options that affect the behavior of the model. 

The `Meta` class is defined as an inner class within a Django model class, and it can be used to set attributes that apply to the model as a whole. 

```python
class SomeFactory:
	class Meta:
		model = "somefile.someModel"
		django_get_or_create = ('id')
...
	
```

### Class Param
A param class is a set of extra parameters that alters the behavior of factory fields. Within SIS, it is often used with `factory.Trait` to define which fields should be altered when the parameters are enabled. Traits are activated or disabled by passing in a boolean field
```python
class SomeFactory:
	class Meta:
		model = "somefile.someModel"
		django_get_or_create = ('id')
	class Params: 
		student = factory.Trait(state='student')
		

SomeFactory(student=True)
```


### Sequence
A counter that is often used for ids within a factory. It gets passed a callback with lambda and can include a specified increment amount:
`id = factory.Sequence(lambda n: n + 1)`


### Lazy Attributes
If some fields of a model can be deduces from others, for instance, the email based on the username, the LazyAttribute can be used. It receives a function taking the object being build and returns the value for the field. 

There is also something called LazyFunction, however this does not receive anything and is not used anywhere in SIS so don't get the two confused. 

### Fuzzy
Fuzzy is also part of the factory_boy library. This is often used for testing fake-realistic models.

FuzzyChoice is used to create a random choice from the given iterable - often given a list of fake data of a specific field. 

FuzzyDateTime generates a random timezone-aware date within a given range. 

### Faker
it is used to easily define realistic-looking factories. It creates fake data fields for the models.

The argument passed in is often a string, such as name or address, which the faker can identify and provide a fake generated value. 









