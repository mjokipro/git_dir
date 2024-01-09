
---
date: 2023-04-15
metadata: true
concepts: ['test-driven-dev', 'testing', 'rest']
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

![[rest-json-apis-1679323071081.jpeg]]

Types of users: (All routes)
- Anon
- User (logged in)
- Admin

Types of info provided: (for POST/PUT/PATCH routes)
- Valid info
- Invalid info
	- Type, Unique, Checks
- Missing info
	- Not null categories

Action on: (for GET/users/username/POST/PUT/PATCH/DELETE routes)
- Existing entity
- Non-existing entity

Types of results: (All routes)
- Works
- Fails

Types of things to test:
- Status code
- Exact output received OR Exact error message thrown


## Register user
- All access

- [x] Works for anon 
- What should happen if logged in user tries to access register?
- What should happen if logged in ADMIN user tries to access register?

- [x] Fails invalid info - duplicate username 
- [ ] Fails invalid info - invalid email  and/or other fields
- [ ] Fails missing info

## Login user

- [ ] Works for anon
- What should happen if logged in user tries to access register?
- What should happen if logged in ADMIN user tries to access register?

- [ ] Fails incorrect username
- [ ] Fails infcorrect password

## Get /users/

- Only logged in users

- [ ] Works for admin
- [ ] Works for user


## Refactor

- Use authentication site wide

