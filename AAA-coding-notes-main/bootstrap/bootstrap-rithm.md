### Benefits
-   Make tricky column layouts easy
-   Provides consistent results across browsers
-   Make responsive design much easier
-   Includes useful interactive components
    -   Modals, dropdowns, popovers, etc
-   _Declarative_ look and feel
    -   Easier to theme
    -   Familiar for writing custom CSS

## Big Ideas: Responsive & Semantic

### Responsive Groups

- xs
	- Cell phones in portrait mode
- sm
	- Cell phones in landscape / small tablets
- md
	- Tablets
- lg
	- Average sized-laptops
- xl
	- Wide screens
- xxl
	- Ultra-wide screens

### Semantic Colors

| Name | Purpose | Default |
| --- | --- | --- |
| primary | Brand color | blue |
| secondary | Neutral brand-appropriate color | grey |
| success | Operation successful | green |
| danger | Dangerous operation / error | red |
| warning | Risky operation | orange |
| info | FYI message | light blue |

Used for table cells, text, buttons, & more

## Using Bootstrap

Just link their CSS stylesheet to use:
```
<link rel="stylesheet"
  href="https://unpkg.com/bootstrap@5/dist/css/bootstrap.css">
```

To use interactive components, include their JS script file:
```
<script
  src="https://unpkg.com/bootstrap@5/dist/js/bootstrap.bundle.js">
</script>
```

## Layout

- & All content should descend from a _container_ element that has one of these classes.

### Two types containers:
- .container-fluid
	- Full-browser-width container (with small amount of breathing room).

- .container
	- Full-browser-width but at specific breakpoints.  
	- Makes UI testing easier: far fewer possible layouts to test.

Content that doesn’t need to be in columns can go directly in this. 
#questions is ‘this’ `.container`, or ‘a container’

### Grids
-   12 Column Layout
-   Cells can span any number of columns
-   After all columns are used, will become new row
-   To use: all columns must be in a .row

```
<div class="container">
  <div class="row">
    <div class="col-4">A</div>
    <div class="col-4">B</div>
    <div class="col-4">C</div>
    <div class="col-4">D</div>
    <div class="col-4">E</div>
    <div class="col-4">F</div>
  </div>
</div>
```
→ This forms two rows of 3 columns
	- The “4” in “col-4” means take up 4 columns of the 12 column layout

### Responsive Grid
-   Can specify a breakpoint: 
	- Meaning:  that size and above use this style
-   Specification without breakpoint is for `xs` (mobile-first design)

different # columns by screen size
```
<div class="container">
  <div class="row">
    <div class="col-6 col-md-4">A</div>
    <div class="col-6 col-md-4">B</div>
    <div class="col-6 col-md-4">C</div>
    <div class="col-6 col-md-4">D</div>
    <div class="col-6 col-md-4">E</div>
    <div class="col-6 col-md-4">F</div>
  </div>
</div>

```
→ This form has 2 columns on cell phones (because no breakpoint specified, it’s `xs` by default) 
	(12/6 = 2 columns)
→ 3 columns for larger devices, where `md` specified
	(12/4 = 3 columns)

### Auto-Columns
-   Can leave off numbers & divide by available size
-   Useful when you don’t know how many items there will be
- #questions  Can you use auto-columns with diff screen sizes? & how to do that?

auto-columns
```
<div class="container">
  <div class="row">
    <div class="col">A</div>
    <div class="col">B</div>
  </div>

  <div class="row">
    <div class="col">C</div>
    <div class="col">D</div>
    <div class="col">E</div>
  </div>
</div>
```

## Images
- .img-fluid
	- Make image responsive; won’t be wider than parent

- Learn more: [Images Docs](https://getbootstrap.com/docs/5.0/content/images/)

## Tables
- & When using table class featurs, must always start with the `.table` class first, then can add more specific table classes as wanted/needed.

- .table
	- Get nice standard table look (use this plus other classes)

- .table-hover
	- Hover-effect over a row

- .table-sm
	- Tighten up margin around cells

- .table-striped
	- Stripe alternative rows

- Learn more: [Table Docs](https://getbootstrap.com/docs/5.0/content/tables/)

## Alerts

- Useful for providing feedback/warnings:
- .alert
	- _(use this plus other classes)_
- .alert-\[semantic-color\]
	- Use color scheme for this level of message.
- Learn more: [Alerts](https://getbootstrap.com/docs/5.0/components/alerts/)

## Buttons

- .btn
	- _(Use this plus other classes)_
- .btn-\[semantic-color\]
	- Use color scheme for this level of message
- .btn-link
	- Make button look like a `<a>` link
	- Even though the element is really a button!
- .btn-lg / .btn-sm
	- Make larger or smaller button
- & Can use these classes on `<a>` links to make them look like they’re actually buttons—very useful!

- Learn more: [Button Docs](https://getbootstrap.com/docs/5.0/components/buttons/)

## UI Components
-   Breadcrumbs
-   Forms
-   Lists
-   Media cards
-   Pagination sets
-   and more!

- Learn more: [Components](https://getbootstrap.com/docs/5.0/components/)

## JavaScript Components
- & Just remember to add JS CDN link for Bootstrap

-   Carousels
-   Collapse
-   Dropdown
-   Modals
-   Popovers
-   Tooltips
-   and more!

- Learn more: [Components](https://getbootstrap.com/docs/5.0/components/carousel/)

## Bootstrap Wrap-Up

### Does Everyone Use Bootstrap?
- No
	- But almost everyone uses _some_ CSS framework

### Theming Bootstrap

-   Can write your own CSS to change things
-   Can make your own Bootstrap with SASS _(advanced)_
-   Can find thousands of Bootstrap themes
-   Can easily use [Bootswatch](https://bootswatch.com/) to use customized themes

## Bootstrap Icons
-   Excellent image icons: [Bootstrap Icons](https://icons.getbootstrap.com/),
-   Icons come as fonts allowing them to scale easily

Include the bootstrap icons stylesheet to use:
```
<link rel="stylesheet"
  href="https://www.unpkg.com/bootstrap-icons/font/bootstrap-icons.css">
```

Add icon name to a class on a `i` or `span` tag to use:
```
<!-- bi stands for bootstrap icon -->
<i class="bi bi-apple"></i> <!-- Apple icon -->
<i class="bi bi-star-fill"></i>  <!-- solid star -->
<i class="bi bi-star"></i>  <!-- regular (outline) of star -->

<!-- font-size can be applied to an icon to resize -->
  <i class="bi bi-search" style="font-size: 30px"></i>
  <i class="bi bi-search" style="font-size: 80px"></i>

<!-- icons scale in size to fit their parent element -->

  <!-- search icon inside a small button -->
  <button type="submit" class="btn btn-primary btn-sm">
    <span class="bi-search"></span>
    Search
  </button>

  <!-- search icon inside a large button -->
  <button type="submit" class="btn btn-primary btn-lg">
    <span class="bi-search"></span>
    Search
  </button>
```

- % Note on Font Awesome
	-  Another popular font library is [Font Awesome](https://fontawesome.com/). While this has historically been very popular, the core open source part of it has become harder to use outside of their commercial offering.