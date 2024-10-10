# sb_49-03-01_TakeHomeChallenge-1_yodlr

Using the [Yodlr backend base code](https://github.com/rithmschool/yodlr-take-home), [forked the repository](https://github.com/JimGeist/yodlr-take-home) then created a ReactJS front end to the Yodlr backend.

## routes
`/admin` - calls `{backend}/users` get call to get all the Yodlr users. Page lists the email, first name and last name for each Yodlr contributor (*contributor* sounds nicer than *user*). Page includes logic for a loading message, 0 contributor message, and a generic an error occurred (definite sigh).

`/signup` - present the future contributor with a form to join **Yodlr** by supplying an email address, first name, and last name. state = "pending" is set when adding the user to Yodlr. Rough in for field level error messaging is set up for eventual field validation. The `/signup` route is also the default route for the Yodlr front end. 

## Backend Updates
CORS, Cross-Origin Resource Sharing was an issue. 
```
const cors = require("cors");
...
app.use(cors());
```
declarations were added to the backend's `index.js` file.

The default `port` was changed from `3000` to `5000`.

## Total Time
**7.6 hours.**
- 88 minutes - environment setup. Forking the back end was not an issue. Setting git up locally to use it was an issue. After numerous attempts, decision was made to have the front end code managed by its own git.
- 282 minutes - signup route.
- 86 minutes - admin route.


