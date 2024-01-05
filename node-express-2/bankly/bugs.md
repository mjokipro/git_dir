# Bug #1
removed extra module.exports = app

# Bug #2
Unsecure login

## Fix
Added an await statement

# Bug #3
deleting user not using await

## Fix
Added await to User.delete

# Bug #4
All users default to no-admin.

## Fix
Add a conditional admin on the user registration.

# Bug #5
searching non-existant user returns empty object instead of an error

## Fix
The get(username) method in user now throws error.

# Bug #6
token returning on header request 

## Fix
verify token instead of decode

# Bug #7
password not hashing
## Fix
hash password for db, not plain text



