
---
date: 2023-04-03
metadata: True
concepts: ['flask', 'routes', 'views']
status: 'post-lecture'
docs: []
cite: ['rithm']
---

## after_request()

- Will use less often then before_request
- Really only useful if there is something that you’re doing in setup, that could need to be cleaned up in some way
- sql alchemy auto creates a transaction
	- sql has this under hood in case of errors in transaction:
		  ![](assets/image/Study%20Hall-1680540773502.jpeg)
