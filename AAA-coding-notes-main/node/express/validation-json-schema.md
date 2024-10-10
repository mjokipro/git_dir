
---
date: 2023-04-11
metadata: true
concepts: ['json', 'validation', 'schema']
status: 'pre-lecture'
docs: 
	jsonschema: 'https://json-schema.org/learn/getting-started-step-by-step.html'
cite: ['rithm']
---

## Goals

-   Understand how and why to validate APIs
-   Validate our JSON APIs using jsonschema

## Data Validation with Schemas

### Server-side Data Validation

An API server lacking adequate validation can result in:

-   incomplete data
-   poor experience for API users
-   security bugs

### Why JSON Schema?

- There are three main reasons for using a schema validation system:
	- So API users fail fast, before bad data gets to your db.
	- To prevent unexpected/insecure information from entering db.
	- To get a validation system that is easy to setup and maintain.

### Rolling Your Own Validation Doesn’t Always Scale

Let’s assume you have a ice cream `/order` endpoint,  
and a JSON payload to add a new order looks like this:

```json
{
  "order": {
    "flavor": "cardamom",
    "numScoops": 2,
    "cone": true,
    "cost": 3.50
  }
}
```

### Your request

Your `/order POST` request handler might look like this:

demo/routes/orders.js
```js
router.post("/", function (req, res, next) {
  const order = req.body?.order;
  if (!order) throw new BadRequestError("Order data is required");

  // ... snip ...

  return res.json({ordered: true});
});
```

Light validation here — checking if _any_ `req.body.order` is given

### More validation

-   We want to make sure flavor is a string
-   We want to make sure numScoops is 1, 2, or 3
-   We want to make sure cone is true or false
-   We want to make sure cost is a floating-point number

- ! If we rolled our own validation this way, every request handler would have lots of conditional logic checking for edge cases.

## JSON Schema Basics

We can describe the schema of valid JSON:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://our.company.com/order.schema.json",
  "title": "Order",
  "description": "Order for an ice cream.",
  "type": "object",
  "properties": {
    "flavor": {"type": "string"},
    "numScoops": {
      "type": "integer",
      "minimum": 1,
      "maximum": 3
    },
    "cone": {"type": "boolean"},
    "cost": {"type": "number"}
  },
  "additionalProperties": false,
  "required": [
    "flavor",
    "numScoops",
    "cone",
    "cost"
  ]
}
```

- The schema is always an object, and must contain these keys - `$schema` and `$id`
$(part of schema JSON)$
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://our.company.com/order.schema.json",
}
```

- Our schema should get a `title` and `description`, and `type` (we’re describing an object):
$(part of schema JSON)$
```json
{
  "title": "Order",
  "description": "Order for an ice cream.",
  "type": "object",
}
```

- We should have a `properties` key of valid property descriptions:
$(part of schema JSON)$
```json
{
  "properties": {
    "flavor": {"type": "string"},
    "numScoops": {
      "type": "integer",
      "minimum": 1,
      "maximum": 3
    },
    "cone": {"type": "boolean"},
    "cost": {"type": "number"}
  },
}
```

- We should indicate which are `required`, and if `additionalProperties` are allowed:
$(part of schema JSON)$
```json
{
  "additionalProperties": false,
  "required": [
    "flavor",
    "numScoops",
    "cone",
    "cost"
  ]
}
```

### Complete Schema

$demo/schemas/orderSchema.json$
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://our.company.com/order.schema.json",
  "title": "Order",
  "description": "Order for an ice cream.",
  "type": "object",
  "properties": {
    "flavor": {"type": "string"},
    "numScoops": {
      "type": "integer",
      "minimum": 1,
      "maximum": 3
    },
    "cone": {"type": "boolean"},
    "cost": {"type": "number"}
  },
  "additionalProperties": false,
  "required": [
    "flavor",
    "numScoops",
    "cone",
    "cost"
  ]
}
```

## Validating our Schema

-   Install and import the library `jsonschema`
```shell
$ npm install jsonschema
```

```js
jsonschema = require("jsonschema");
```

-   Call `.validate(userInput, mySchema, {required: true})`
	-   The validator checks if user input is valid against schema.
	-   If invalid, you respond with errors. Otherwise continue.
$jsonschema$
```js
jsonschema.validate(userInput, mySchema, {required:true});
```

- ! Attention: `{required: true}`
	- undefined is not a value that JSON recognizes. For some reason, the developers who created jsonschema decided that the validator should default to returning true if you attempt to validate something that is undefined. This is a great example of a bad design choice.
	- Passing in this third argument, `{required: true}` will change this default behavior, and throw an error if the data you are trying to validate has a value of undefined.

$demo/routes/orders.js$
```js
const jsonschema = require("jsonschema");
const orderSchema = require("../schemas/orderSchema.json");
```

$demo/routes/orders.js$
```js
/** POST /with-validation:
 *    { order: { flavor, numScoops, cone, cost } } => { ordered: true }
 */

router.post("/with-validation", function (req, res, next) {
  const result = jsonschema.validate(
      req.body?.order, orderSchema, {required: true});
  if (!result.valid) {
    // pass validation errors to error handler
    //  (the "stack" key is generally the most useful)
    const errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  // insert into db ...
  return res.json({ordered: true});
});
```

- ~ Note: **Error handling**
	- In our current example, the error we send back to the client if the schema validation fails is just a single string with all of the individual failure messages concatenated together. While that might be unfriendly if we were building a web application, APIs usually return terse explanations meant to be interpreted by other developers.

## Learning More

- You can check that an item is in a list of allowed choices and you can have arrays (or other objects) nested in a schema:

$(part of schema JSON)$
```json nums {5, 14-19}
{
  "properties": {
    "flavor": {
      "type": "string",
      "enum": ["mint", "vanilla", "chocolate", "cardamom"]
    },
    "numScoops": {
      "type": "integer",
      "minimum": 1,
      "maximum": 3
    },
    "cone": {"type": "boolean"},
    "cost": {"type": "number"},
    "toppings": {
      "type":  "array",
      "items": [
        { "type": "string" }
      ]
    }
  },
}

```

- There are even more parts of JSON schemas:
	-   validating that a value is in a fixed list
	    -   we could use this to check that flavor is only one of our flavors
	-   validating using _regular expressions_ for very specific text patterns
	-   reusing parts of a schema in other schemas
- We won’t need these here, but you can always [learn more](https://json-schema.org/learn/getting-started-step-by-step.html)

- ~ Note: Making schemas programmatically from data
	- There are even websites that you can provide sample valid data to and they will produce a schema. You can try this out at [jsonschema.net](https://jsonschema.net/)
	- This can be helpful when you have a long schema with lots of boilerplate fields. However, while here, we want you to make your schemas by hand — it’s important for you to learn what kinds of validations will be required, and it will make you more comfortable if you switch later to autogenerated schemas, since you’ll have a good sense of where to tweak them.
