
---
date: 2023-07-21
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

In this second half, you’ll incorporate authentication into your React front end.

## Step One: Refactor Component Hierarchy[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#step-one-refactor-component-hierarchy "Permalink to this headline")

It will help you first get a sense of how this app should work once authentication functionality has been added.

We have a demo running at [http://react-jobly-2.surge.sh](http://react-jobly-2.surge.sh/). Take a tour and note the additional features.

You can register as a new user and explore the site or log in as our test user, “testusername” (password: “password”).

Refactor your component design. Take time to think about the new components you’ll need, new state, and where they might live.

Attention

Stop and get a code review.

We’d really like to see your thinking here.

Once you’ve received your review, you should look at our solution’s [component design](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/our-design-2.html).

## Step Two: Update Your Routes File[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#step-two-update-your-routes-file "Permalink to this headline")

Look at the demo to see the new routes you’ll need:

/login

Login/signup

/signup

Signup form

/profile

Edit profile page

## Step Three: Current User[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#step-three-current-user "Permalink to this headline")

This step is tricky. Go slowly and test your work carefully.

Add features where users can log in, sign up, and log out. This should use the backend routes design for authentication and registration.

When the user logs in or registers, retrieve information about that user and keep track of it somewhere easily reached elsewhere in the application.

Things to do:

-   Make forms for logging in and signing up
    
-   In the navigation, show links to the login and signup forms if a user is not currently logged in.
    
    If someone is logged in, show their username in the navigation, along with a way to log out.
    
-   Have the homepage show different messages if the user is logged in or out.
    
-   When you get a token from the login and register processes, store that token on the JoblyApi class, instead of always using the hardcoded test one (it’s now ok to modify this token). You should also store the token in state high up in your hierarchy; this will let use use an effect to watch for changes to that token to kick off a process of loading the information about the new user.
    

Think carefully about where functionality should go, and keep your components as simple as you can. For example, in the LoginForm component, its better design that this doesn’t handle directly all of the parts of logging in (authenticating via API, managing the current user state, etc). The logic should be more centrally organized, in the App component or a specialized component.

While writing this, your server will restart often, which will make it tedious to keep typing in on the login and signup forms. A good development tip is to hardcode suitable defaults onto these forms during development; you can remove those defaults later.

Hint on Proceeding — Read After Thinking!

Here’s the strategy we took from our solution:

-   Make login, signup, and logout functions in the App component.
    
    By passing login, logout, and signup functions down to the login and signup forms and the navigation bar, they’ll be able to call centralized functions to perform these processes.
    
-   Add token as a piece of state in App, along with state for the currentUser.
    
-   Create an effect triggered by a state change of the token: this should call the backend to get information on the newly-logged-in user and store it in the currentUser state.
    
-   Expose the current user throughout the app with a context provider. This will make it easy to refer to the current app in navigation, on pages, and so on.
    

This would be an excellent place to use useContext, so you can store the current user’s info high up in your hierarchy, like on the App component.

Attention

Stop and get a code review

## Step Four: Using localStorage and Protecting Routes[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#step-four-using-localstorage-and-protecting-routes "Permalink to this headline")

If the user refreshes their page or closes the browser window, they’ll lose their token. Find a way to add localStorage to your application so instead of keeping the token in simple state, it can be stored in localStorage. This way, when the page is loaded, it can first look for it there.

Be thoughtful about your design: it’s not great design to have calls to reading and writing localStorage spread around your app. Try to centralize this concern somewhere.

### Protecting Routes[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#protecting-routes "Permalink to this headline")

Once React knows whether or not there’s a current user, you can start protecting certain views! Next, make sure that on the front-end, you need to be logged in if you want to access the companies page, the jobs page, or a company details page.

Attention

Stop and get a code review

## Step Five: Profile Page[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#step-five-profile-page "Permalink to this headline")

Add a feature where the logged-in user can edit their profile. Make sure that when a user saves changes here, those are reflected elsewhere in the app.

Attention

Stop and get a code review

## Step Six: Deploy your Application[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#step-six-deploy-your-application "Permalink to this headline")

We’re going to use Render to deploy our backend and Surge to deploy our frontend! Before you continue, make sure you have two folders, each with their own git repository (and make sure you do not have one inside of another!)

Your folder structure might look something like this:

```
jobly-backend
jobly-frontend

```

It’s important to have this structure because we need two different deployments, one for the front-end and one for the backend.

### Backend[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#backend "Permalink to this headline")

This will be the same process of deploying a backend at Render, with a database at ElephantSQL:

#### Getting a database[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#getting-a-database "Permalink to this headline")

1.  Create account at [ElephantSQL](https://www.elephantsql.com/) using GitHub
2.  Create a “Tiny Turtle” (free) instance
3.  Select region: US-West-1 _(even if others are closer to you)_.
    -   If you get an error selecting US-West-1, pick US-East-1
4.  Confirm and create
5.  Click on your new instance and copy the URL

#### Seeding your new database[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#seeding-your-new-database "Permalink to this headline")

```
$ pg_dump -O jobly | psql (url you copied here)

```

This dumps your existing jobly database and loads it in your new database.

#### Checking your database[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#checking-your-database "Permalink to this headline")

```
$ psql (url you copied here)

```

#### Render[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#render "Permalink to this headline")

1.  Create an account at [Render](https://render.com/) using GitHub
2.  From dashboard, create a new instance of “Web service”
3.  Connect to your repository
4.  Give it a name _(this must be globally unique)_
5.  Make sure the start command is `npm start`
6.  Choose advanced, and enter environmental variables:
    -   DATABASE\_URL: URL from ElephantSQL (change `postgres:` → `postgresql:`)
    -   SECRET\_KEY: anything you want _(to be secure: long and random)_
    -   NODE\_ENV: “production”
7.  Choose “Create Web Service”

### Frontend[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#frontend "Permalink to this headline")

Now let’s deploy the frontend! To do that, we’re going to be using a tool called Surge, which is a very easy way to deploy static websites!

Make sure that you have the surge command installed. You can run this command anywhere in the Terminal.

On Mac:

```
$ npm install --global surge

```

On WSL/Linux:

```
% sudo npm install --global surge

```

In your `JoblyApi.js` and **anywhere else you make requests to localhost:3001** make sure you have the following:

```
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

```

Next, let’s make sure we define the environment variable **for our frontend app**. REACT\_APP\_BASE\_URL should be the URL of your Render backend.

Make sure you are running the following commands in the jobly-frontend folder

```
$ REACT_APP_BASE_URL=YOUR_BACKEND_URL npm run build
$ cp build/index.html build/200.html
$ surge build

```

Attention

Stop and get a code review!

Congratulations! You’ve reached the end of the main part of the exercise. Please let us take a look at your work and provide a code review.

## Further Study[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#further-study "Permalink to this headline")

There’s already plenty here! But if you do finish early, or want to learn more by continuing to work on this, we have some suggestions for further study.

-   [Jobly Further Study](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/further-study.html)
    -   [Job Applications](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/further-study.html#job-applications)
    -   [Custom Hooks](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/further-study.html#custom-hooks)
    -   [Testing with AJAX](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/further-study.html#testing-with-ajax)
    -   [Nav Links](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/further-study.html#nav-links)
    -   [Pagination](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/further-study.html#pagination)
    -   [Live Search](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/further-study.html#live-search)
    -   [Un-Apply to Jobs](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/further-study.html#un-apply-to-jobs)
    -   [Show A List of Companies Applied To](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/further-study.html#show-a-list-of-companies-applied-to)
    -   [Add Edit Form for Companies](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/further-study.html#add-edit-form-for-companies)

## Solution[»](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/part-2.html#solution "Permalink to this headline")

-   [React Jobly: Part 2](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/solution/part-2.html)
    -   [Our Components](https://rithm-students-assets.s3.amazonaws.com/r30/exercises/react-jobly/handout/solution/part-2.html#our-components)