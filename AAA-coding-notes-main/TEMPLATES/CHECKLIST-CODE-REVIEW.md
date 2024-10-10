---
date: <% tp.date.now("YYYY-MM-DD") %>
metadata: true
---

## Design
- [ ] Global variables avoided where possible
	- [ ] If present, at TOP of file with CLEAR NAMES
	- [ ] Global consts in CAPITAL_SNAKECASE
- [ ] Controller function?
- [ ] Functions
	- [ ] small (less than 20-40 lines)
	- [ ] single purpose
	- [ ] concerns are separated (getting UI  vs.  setting UI  vs.  calculating)
	- [ ] blank lines separate ideas
	- [ ] const everywhere you can
	- [ ] guards come first in conditionals
- [ ] APIs
	- [ ] Base URL used for API as CONST, then remainder concat on each section

## Naming
- [ ] File names:  camelCase
- [ ] Functions:  Verb - Noun
- [ ] Boolean:  isSomething
- [ ] Objects:  keyToValue
- [ ] Units included in name where appropriate


## Doc Strings
- [ ] At top of file for explaining game/app
- [ ] Classes
	- [ ] Have example of an instantiation of that class in the docstring
	- [ ] All methods have doc string
		- [ ] In shorter human language
- [ ] All Functions have docstring
- [ ] Are consistent in tense & language
- [ ] Other comments on lines where needed

## Final Check
- [ ] `“use strict”;`  at top
- [ ] Line lengths 80-90 max
	- [ ] Separate parameter by having one on each line when you need to break up line lengths
- [ ] Format Document/ Prettier 
- [ ] Changes committed and pushed
