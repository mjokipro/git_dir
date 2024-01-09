
---
date: 2023-07-17
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## ElephantSQL

-   Host for PostgreSQL databases
-   Have excellent commercial options, but also a free, small instance

### Getting a database

1.  Create account at [ElephantSQL](https://www.elephantsql.com/) using GitHub
2.  Create a “Tiny Turtle” (free) instance
3.  Select region: US-West-1 _(even if others are closer to you)_.
    -   If you get an error selecting US-West-1, pick US-East-1
4.  Confirm and create
5.  Click on your new instance and copy the URL

### Seeding your new database

```
$ pg_dump -O warbler | psql (url you copied here)

```

This dumps your existing warbler database and loads it in your new database.

### Checking your database

```
$ psql (url you copied here)

```

## Render

-   A service for serving web applications from the cloud
-   Similar to Salesforce’s Heroku product, but has a free tier

### Installing gunicorn

When we deploy an application in production, we will always want to  
use a server that is production ready and not meant for just development.

The server we will be using is gunicorn so let’s make sure we:

```
(venv) $ pip install gunicorn
```

### Ensuring a correct deployment

-   Render needs to know our dependencies!
-   Make sure you `pip freeze > requirements.txt`

### Setting up your app

1.  Create an account at [Render](https://render.com/) using GitHub
2.  From dashboard, create a new instance of “Web service”
3.  Connect to your repository
4.  Give it a name _(this must be globally unique)_
5.  Make sure the start command is `gunicorn app:app`
	1. If using Flask(?) with gunicorn, use start command: 
	   `gunicorn app:app --threads 4` (from Evan r30 discord)
6.  Choose advanced, and enter environmental variables:
    -   DATABASE\_URL: URL from ElephantSQL (change `postgres:` → `postgresql:`)
    -   SECRET\_KEY: anything you want _(to be secure: long and random)_
    -   PYTHON\_VERSION: `3.11.2`
7.  Choose “Create Web Service”

### Debugging your app

From the dashboard for your app, you can view the logs

### Updating your app

When you push to your GitHub repo, it will automatically redeploy your site.

You can turn that off under Settings → Auto-Deploy,  
and then can do manual deploys.