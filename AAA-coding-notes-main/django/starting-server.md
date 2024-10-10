
---
date: 2023-05-08
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

1. Start server:
   ```shell
   python manage.py runserver
```
[http://localhost:8000/polls/](http://localhost:8000/polls/)



- For each app:
	- need to update `mysite/settings.py`
```python
INSTALLED_APPS = [
    "polls.apps.PollsConfig",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]
```

By running `makemigrations`, you’re telling Django that you’ve made some changes to your models (in this case, you’ve made new ones) and that you’d like the changes to be stored as a _migration_.

- & Only 1 person has to run `makemigrations` the person that changes the table 
- Locks down what changes need to be made for schemas

Migrations are how Django stores changes to your models (and thus your database schema) - they’re files on disk. You can read the migration for your new model if you like; it’s the file `polls/migrations/0001_initial.py`. Don’t worry, you’re not expected to read them every time Django makes one, but they’re designed to be human-editable in case you want to manually tweak how Django changes things.

There’s a command that will run the migrations for you and manage your database schema automatically - that’s called [`migrate`](https://docs.djangoproject.com/en/4.2/ref/django-admin/#django-admin-migrate), and we’ll come to it in a moment - but first, let’s see what SQL that migration would run. The [`sqlmigrate`](https://docs.djangoproject.com/en/4.2/ref/django-admin/#django-admin-sqlmigrate) command takes migration names and returns their SQL:

```shell
$ python manage.py makemigrations polls
```

The [`migrate`](https://docs.djangoproject.com/en/4.2/ref/django-admin/#django-admin-migrate) command takes all the migrations that haven’t been applied (Django tracks which ones are applied using a special table in your database called `django_migrations`) and runs them against your database - essentially, synchronizing the changes you made to your models with the schema in the database.

Migrations are very powerful and let you change your models over time, as you develop your project, without the need to delete your database or tables and make new ones - it specializes in upgrading your database live, without losing data. We’ll cover them in more depth in a later part of the tutorial, but for now, remember the three-step guide to making model changes:

1. Change your models (in `models.py`).
2. Run [`python manage.py makemigrations`](https://docs.djangoproject.com/en/4.2/ref/django-admin/#django-admin-makemigrations) to create migrations for those changes
3. Run [`python manage.py migrate`](https://docs.djangoproject.com/en/4.2/ref/django-admin/#django-admin-migrate) to apply those changes to the database.

The reason that there are separate commands to make and apply migrations is because you’ll commit migrations to your version control system and ship them with your app; they not only make your development easier, they’re also usable by other developers and in production.

Read the [django-admin documentation](https://docs.djangoproject.com/en/4.2/ref/django-admin/) for full information on what the `manage.py` utility can do.


## Python interactive shell

```shell
$ python manage.py shell
```

## Create

## Read

## Update

## Delete



- That code loads the template called `polls/index.html` and passes it a context. The context is a dictionary mapping template variable names to Python objects.
- The [`render()`](https://docs.djangoproject.com/en/4.2/topics/http/shortcuts/#django.shortcuts.render "django.shortcuts.render") function takes the request object as its first argument, a template name as its second argument and a dictionary as its optional third argument. It returns an [`HttpResponse`](https://docs.djangoproject.com/en/4.2/ref/request-response/#django.http.HttpResponse "django.http.HttpResponse") object of the given template rendered with the given context.
```python
from django.shortcuts import render

from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "polls/index.html", context)
```
