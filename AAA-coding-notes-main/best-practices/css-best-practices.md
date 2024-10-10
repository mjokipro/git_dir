Industry practice varies, but some common ideas are:
-   avoid `!important` where reasonable
-   Keep things modular with multiple files
-   generally, prefer classes over IDs _(IDs for JS is fine!)_
	- style using css classes
	- save ids for JS
-   _“why”_ comments in CSS are often very important
-   adopt & use a naming scheme

### Class Naming Conventions
-   CSS about a “component” is named (via class) after component:
  Capitalized name:
  ```css
  .Tweet { /* ...declarations go here ... */ }
```
-   Variations/small subcomponents get “dashed” name:
  -lowercased name:
  ```css
  .Tweet-likes { /* stuff about the photo ... */ }
```
-   Used-lots-of-places “utilities” get lowercase classes:
  This “kind of” appearance type classes
  ```css
    .muted {
      font-size: 80%;
      color: gray;
    }
```
  

-   This is a light version of [BEM](http://getbem.com/introduction/)