
---
date: 2023-07-20
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: []
---



When editing a credit and unselecting a department or job/position, any corresponding selected jobs or skills will no longer be visible but maintain their selected status, as seen upon save in the gif reproduction below. 



Pull request:

Deselection of a ‘higher’ category unselects all corresponding ‘lower’ items, keeping any selected Jobs that have corresponding selected Departments, and vice versa for Skills and Jobs. 

Fixes # 

While working on this, it was also discovered that the data type held within selectedSkills, selectedJobIds, and selectedDepartments changes from 1st render, where each are arrays of numbers, to an array of strings upon user input. 

Problem shown here:

Fixed result: 
