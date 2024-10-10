
---
date: 2023-04-10
metadata: true
concepts: ['node', 'hashing', 'jwt']
status: 'pre-lecture'
docs: 
	json-web-tokens: 'https://jwt.io/'
cite: ['rithm']
---

## Goals

-   Hash passwords with Bcrypt
-   Using JSON web tokens (JWT)  for API authentication
	- (JWT pronounced “jot”)
	- JWT are a general purpose way to encode info and exchange with other people. 

## Password Hashing with Bcrypt

- Similar to Flask, but with asynchronous API.
	- because bcrypt takes awhile - b/c it’s so computationally intensive

Install library:
```shell
$ npm install bcrypt
```

Import bcrypt:
```js
const bcrypt = require("bcrypt");
```

- `bcrypt.hash(password-to-hash, work-factor)`
	- Hash password, using work factor (12 is a good choice).
		- for class work, 6 is fine
	- Returns _promise_ — resolve to get hashed password.

- `bcrypt.compare(password, hashed-password)`
	- Check if password is valid.
	- Returns _promise_ — resolve to get boolean.

### Hashing Password

demo/auth-api/routes/auth.js
```js nums {7-8}
/** Register user.
 *   {username, password} => {username} */

router.post("/register", async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(
      password, BCRYPT_WORK_FACTOR);
  const result = await db.query(
      `INSERT INTO users (username, password)
         VALUES
           ($1, $2)
         RETURNING username`,
      [username, hashedPassword]);

  return res.json(result.rows[0]);
});
```

### Logging in

- & Try to find user first
    -   If user exists, compare hashed password to hash of login password
- `bcrypt.compare()` resolves to boolean—if true, passwords match!
	- & When checking if `bcrypt.compare()` is true - *always* compare *directly* to true. 
		- If you rely on “truthiness” and accidentally forget the await keyword, `bcrypt.compare` returns a promise, which is truthy, and would falsly give access. 

demo/auth-api/routes/auth.js
```js nums {14}
/** Login: returns {message} on success. */

router.post("/login-1", async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();
  const { username, password } = req.body;
  const result = await db.query(
      `SELECT password
         FROM users
         WHERE username = $1`,
      [username]);
  const user = result.rows[0];

  if (user) {
    if (await bcrypt.compare(password, user.password) === true) {
      return res.json({ message: "Logged in!" });
    }
  }
  throw new UnauthorizedError("Invalid user/password");
});
```

## JSON Web Tokens

### Authentication Via Cookies

- Make request with username/password to login route
- Server authenticates & puts user info session
    - Session is encoded & signed
- Session info is sent back to browser in cookie
- Session info is automatically resent with every request via cookie
	- & cookies are totally a browser thing
	- & curl, insomnia, node can all visit sites but are not browsers
		- therefore, don’t want to use cookies

- This works great for traditional web apps & is straightforward to do
- What if
    - We didn’t want to send auth info with certain requests?
        - 
    - We wanted to share authentication info across multiple APIs / hostnames?
    - & Not in a browser? curl, insomnia, node
- We’ll use a more API-server friendly process!
	- html returning web app - cookies
	- api - token #getQuote 40ish mins in

### Authentication Via Tokens

- For our Express API apps, we’ll handle authentication differently:
	- Make request with username/password to AJAX login route
	- Server authenticates & returns token in JSON
	    - Token is encoded & signed with open standard, “JSON Web Token”
	- Front-end JavaScript receives token & stores _(in var or localStorage)_
	- & For future requests that need it, JS can sends token in request
	    - Server gets token from request & validates token
	    - & This is the big difference - cookies do this automatically, with tokens, have to do this manually.

### JSON Web Tokens

- Docs: [Homepage of JSON Web Tokens](https://jwt.io/)

- JWTs are an open standard and are implemented across technology stacks, making it simple to share tokens across different services.
- JWTs can store any arbitrary “payload” of info, which are “signed” using a secret key, so they can be validated later (similar to Flask’s session).
- The JWT token itself is a string comprising three parts:
	-   **Header:** metadata about token _(signing algorithm used & type of token)_
	-   **Payload:** data to be stored in token _(typically an object)_
	    -   Often, this will store things like the user ID
	    -   This is _encoded_, not _encrypted_ — don’t put secret info here!
	-   **Signature:** version of header & payload, signed with secret key
	    -   Uses algorithm specified in header _(we’ll use default, “HMAC-SHA256”)_

- ~ Note: JWTs Versus Flask sessions
	- JWTs do the same process as a Flask session: encode the payload and sign it using a secret key. Flask’s built-in session uses a Flask-specific encoding and signing algorithm, but there are add-on products for Flask to use JWTs as the encoding/signing scheme for sessions.
	- The bigger difference is in how this is transmitted: Flask’s standard sessions are transmitted via cookies, so they are passed automatically between the server and the browser. The JWT standard isn’t involved itself with when a how tokens are sent — this is up to the application developer. We’ll be doing so by sending these in the request manually, and retrieving them manually from the request in the server.
	- None of this is inherently specific to Flask or Express — there are cookie-based authentication add-ons for Express, and there are JWT libraries for Python, so Flask could emit JWTs for API-based server.
	- For more information, here’s a good [discussion of JWTs versus server-side sessions](https://stackoverflow.com/questions/43452896/authentication-jwt-usage-vs-session).

### Using JWTs

Install JSON web token:

```shell
$ npm install jsonwebtoken
```

### Creating Tokens

`jwt.sign(payload, secret-key, jwt-options)`

payload: object to store as payload of token

secret-key: secret string used to “sign” token

jwt-options is optional object of settings for making the token

This returns the token (a string)

```js
const jwt = require("jsonwebtoken");

const SECRET_KEY = "oh-so-secret";
const JWT_OPTIONS = { expiresIn: 60 * 60 };  // 1 hour

let payload = {username: "jane"};
let token = jwt.sign(payload, SECRET_KEY, JWT_OPTIONS);
```

### Decoding / Verifying Tokens

`jwt.decode(token)`

Return the payload from the token (works _without secret key_.  
Remember, the tokens are signed, not enciphered!)

- `jwt.verify(token, secret-key)`
	- & Verify token signature and return payload is valid. If not, raise error.

```js
jwt.decode(token);               // {username: "jane"}

jwt.verify(token, SECRET_KEY);   // {username: "jane"}

jwt.verify(token, "WRONG");      // error!
```

- ! BE CAREFUL: with jwt.decode!!!!
	- #add

## Using JWTs in Express

### Login

demo/auth-api/routes/auth.js
```js nums {13-14}
/** (Fixed) Login: returns JWT on success. */

router.post("/login", async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();
  const { username, password } = req.body;
  const result = await db.query(
      "SELECT password FROM users WHERE username = $1",
      [username]);
  const user = result.rows[0];

  if (user) {
    if (await bcrypt.compare(password, user.password) === true) {
      const token = jwt.sign({ username }, SECRET_KEY);
      return res.json({ token });
    }
  }
  throw new UnauthorizedError("Invalid user/password");
});
```

