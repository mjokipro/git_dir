CITE: Jonas Udemy couse, webdevsimplified on youtube
- CSS Grid changes whole mindset around layouts.
- CSS Grid  is best for two-dimensional layouts, [[flex-box]] is best for one-dimensional layouts.
- CSS Grid allows you to center items horizontally and vertically while still retaining control to do things like overlap elements.
- Removes the need for CSS frameworks like Bootstrap, and opens up possibilities for any kind of layout (vs just 12 col from bootstrap)
- CSS Grid is also similar to Flexbox in that it has a special property for both the parent and child elements. 
- Use the `minmax` function to make your columns responsive on any device. The `minmax` function takes two arguments, the first being the minimum value and the second being the maximum. These values could be a length, percentage, `fr`, or even a keyword like `max-content`.
- To add space between items in the grid layout, you can use the `grid-gap` property, or specify `row-gap` or `column-gap` separately. 

## Using CSS grid
- Set display: grid on the container
	- grid container
	- grid items
![[grid-1673536266213.jpeg]]

## Terminology
- Column axis: Y direction
- Row axis: X direction
- Grid lines: the lines separating the rows and columns. 
	- Always number of columns + 1 for column grid lines
	- Always number of rows + 1 for row grid lines
- Gutter: space between rows, and space between columns
	- row gutter can be diff than column gutter
- Grid track: 
![[grid-1673536322790.jpeg]]

## Grid Properties
![[grid-1673536655040.jpeg]]

### Grid Container Properties
- `grid-template`
	- shorthand for `grid-template-areas` | `grid-template-rows` | `grid-template-columns`
- `grid-gap`
	- shorthand for `grid-row-gap` | `grid-column-gap`
- justify/align props
	- [`justify-content`](grid#Justify-&-Align-Content)
	- [`align-content`](grid#Justify-&-Align-Content)
	- [`justify-items`](grid#Justify-&-Align-Items)
	- [`align-items`](grid#Justify-&-Align-Items)
- grid auto
	- `grid-auto-rows`
	- `grid-auto-columns`
	- `grid-auto-flow`

### Grid Item Properties
- `grid-area` (`grid-row-start | grid-column-start` | `grid-row-end` | `grid-column-end`), also shorthand for:
	- [`grid-row` ](grid#grid-row&grid-column)
		- which is also shorthand for `grid-row-start` | `grid-row-end`
	- [`grid-column`](grid#grid-row&grid-column)
		- which is also shortand for `grid-column-start` | `grid-column-end`

- justify/align properties
	- [`justify-self`](grid#Justify-&-Align-Self)
	- [`align-self`](grid#Justify-&-Align-Self)
- `order`

## Sizing grid items
- Two ways of sizing items:
	- Container-wise: using grid-template or grid-template-areas
	- Item-wise: using grid-row & grid-column

#### grid-template
- Can size items from simplest version here, by defining `grid-template-rows` and `grid-template-columns` separately, with space between to define spacing of each row.
```css
.grid-container {
	display: grid;
	grid-template-rows: 150px 150px;
	grid-template-columns: 150px 150px 300px;
}
```
![[grid-1673539987802.jpeg]]

##### repeat function
- If sizing is repeated, can use repeat function with 2 args: 
	- Num times to repeat
	- The size
- Note that add’n rows/columns can be added with space after repeat function. 

```css
.grid-container {
	display: grid;
	grid-template-rows: 150px 150px;
	grid-template-columns: repeat(2, 150px) 300px;
}
```

##### `fr`
- fractional unit
- Allows divisions of rows/columns by fractions of available space
```css
.grid-container {
	display: grid;
	grid-template-rows: repeat(2, 150px);
	grid-template-columns: 1fr 3fr 3fr;
}
```
![[grid-1673540453436.jpeg]]

##### max-content
- Can set as a sizing option to fit maximum content on one line, will avoid any line breaks
```css
.grid-container {
	display: grid;
	grid-template-rows: repeat(2, 150px);
	grid-template-columns: max-content 2fr 2fr max-content;
}
```
![[grid-1673561482719.jpeg]]

##### min-content
- Can set as a sizing option to fit minimun content one one line, will by default break at the word. Therefore width will be the longest word.
```css
.grid-container {
	display: grid;
	grid-template-rows: repeat(2, 150px);
	grid-template-columns: min-content 2fr 2fr min-content;
}
```
- Note that for the first column, rendering is same whether set to max-content or min-content b/c content is only 1 word.
![[grid-1673561853708.jpeg]]
- Notice for the 4th column 1st row’s content gets cut due to the specified size for `grid-template-rows` (CSS auto formats last row to match content, but doesn’t do this for earlier rows)
	- This provides an excellent example of when using the minmax function is advantageous

##### minmax function
- Takes 2 arguments, a minimum value and a maximum value that CSS will then determine a size between to set as the rendered height/width.
```css
.grid-container {
	display: grid;
	grid-template-rows: repeat(2, minmax(150px, min-content));
	grid-template-columns: min-content 2fr 2fr min-content;
}
```
- This means that the 4th column’s height will be at minimum 150px, and at max will fit the min-content
![[grid-1673561490656.jpeg]]

##### auto-fill
- can add instead of a specified number in the repeat function if you don’t know how many rows/columns there will be, and want the formatting to be responsive
	- Will ‘fill’ container width
```css
.grid-container {
	width: 1000px;
	display: grid;
	grid-template-rows: repeat(2, minmax(150px, min-content));
	grid-template-columns: repeat(auto-fill, 100px);
}
```
- Notice how 10 column tracks were created: 1000 / 100 = 10. This is makes auto-fill and auto-fit different.
![[grid-1673564102630.jpeg]]

##### auto-fit
- can add instead of a specified number in the repeat function if you don’t know how many rows/columns there will be, and want the formatting to be responsive
	- BUT will ‘fit’ the content (vs ‘fill’ the container height/width)
```css
.grid-container {
	width: 1000px;
	display: grid;
	grid-template-rows: repeat(2, minmax(150px, min-content));
	grid-template-columns: repeat(auto-fit, 100px);
}
```
![[grid-1673564544174.jpeg]]
- Note you can combine these by having `autofit` and `minmax` function to have really responsive layout that will add rows and columns as needed with flexible widths/heights.
```css
.grid-container {
	width: 1000px;
	display: grid;
	grid-template-rows: repeat(auto-fit, minmax(150px, min-content));
	grid-template-columns: repeat(auto-fit, 100px);
}
```
![[grid-1673565199851.jpeg]]

### Naming grid lines
- You can custom-name grid lines (typical practice in professional development) by adding name in brackets in front of the size.
- You can add multiple names by adding a space between the names within the `[]`
- When naming and using the repeat function, name will be applied to each row/column, and because there would be conflicting names, a number is added after the provided name
```css
.grid-container {
	display: grid;
	grid-template-rows: [header-start] 1fr [header-end main-start] 3fr [main-end footer-start] 3fr [footer-end];
	grid-template-columns: repeat(2, [col-start] 150px [col-end]); 
		/* There will end up being col-start 1, col-start 2, col-end 1, col-end 2 */
}
```

### Naming_grid_areas
- You can name grid cells and grid areas using the `grid-template-areas` property
	- For empty cells, use  `.`
```css
.grid-container {
	display: grid;
	grid-template-rows: 100px 200px 400px 100px;
	grid-template-columns: repeat(3, 1fr) 200px;
	grid-template-areas: ". header header ."
						 "box1 box2 box3 side"
						 "main main main side"
						 "footer footer footer footer";
}
```
- Combine this with positioning using [grid-area](grid#grid-area)
- ! Make sure all cells are accounted for using this method, otherwise ‘grid-area’ will break 

#### grid-template-areas
- Great for when you need to resize elements based on diff screen sizes
- Not the common way to use grid though
```css
.grid-container {
	display: grid;
	grid-template-columns: 200px 250px;
	grid-auto-rows: minmax(150px, auto);
	grid-template-areas: 
		"header header"
		"sidebar content"
		"sidebar content"
	grid-gap: 20px;
}

.grid-item-1 {
	grid-area: header;
}

.grid-item-2 {
	grid-area: sidebar;
}

.grid-item-3 {
	grid-area: content;
}
```
![[grid-1670455916239.jpeg]]

#### grid-row&grid-column
- Much more common way of sizing
```css
.grid-container {
	display: grid;
	grid-template-columns: 200px 250px;
	grid-auto-rows: minmax(150px, auto);
	grid-gap: 20px;
}

.grid-item-1 {
	grid-column-start: 1;
	grid-column-end: 3; 
	/* For first row to stretch across width of both columns */
	/* Could also put -1 instead of 3 to span across all # columns */
	/* Could also use shorthand-  grid-column: 1 / 3;  */
}

.grid-item-2 {
	grid-row: 2 / 4;
	/* Using shorthand, for second row second column to stretch down 2 rows */
}

.grid-item-3 {
	grid-row: span 2;
	/* Another shorthand way to specify that this element will span 2 rows */
}
```
![[grid-1670456554399.jpeg]]

## Positioning: Using grid items
### grid-row&grid-column
- Can position individual grid item(s) by using `grid-row-start`, `grid-row-end`, `grid-column-start`, `grid-column-end` properties. (or shorthand for these)
```css
.grid-item-selector {
	color: white;
	padding: 20px;

	&--1 {
		background-color: orangered;
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 2;
		grid-column-end: 3;
	}
}
```
![[grid-1673541680982.jpeg]]

#### Spanning grid items
- Can additionally span grid items across multiple rows or multiple columns by having them ‘end’ at the larger number, shown in `grid-column` below.
```css
.grid-item-selector {
	color: white;
	padding: 20px;

	&--1 {
		background-color: orangered;
		grid-row: 2 / 3;
		grid-column: 2 / 4;
	}
}
```
- Also possible to have multiple grid items in the same cell
	- means grid items can overlay on each other (just change z-index of one that you want on top)
- Other variations:
	- Can set `grid-column-end` or `grid-row-end` to span set number of elements
	- If you want to span the whole length, but don’t remember # rows/columns, can set to -1
```css
.grid-item-selector {
	color: white;
	padding: 20px;

	&--1 {
		background-color: orangered;
		grid-row: 2 / span 2;
		grid-column: 1 / -1;
	}
}
```

### grid-area
- After using [grid-template-areas](grid#Naming_template_areas) to name template areas, can use `grid-area` to position item(s).
```css
.header {
	grid-area: header;
}

.sidebar {
	grid-area: side;
}

.main-content {
	grid-area: main;
}

.footer {
	grid-area: footer;
}
```

- ! Just need to be careful with this method to make sure whole layout is accounted for in `grid-template-areas`, and fill out all cells.

## Aligning grid items
-  Much like Flexbox, with CSS Grid you can align the content of grid items with `align-items` and `justify-items`. `align-items` will align child elements along the column axis, and `justify-items` will align child elements along the row axis.

#### Justify-&-Align-Content
- Justifies/Aligns grid <u>items</u> within their <u>container</u>
	- As long as rows/columns do <u>not</u> span the entire width/length of the container, then you can customize the alignment/justification of each track. (if they span the whole width, it won’t look any different using these properties, and instead you could adjust justify/align items)
- `justify-content`
	- `start`  |  `center`  |  `end`  |  `space-between`  |  `space-around`  |  `space-evenly`
	- applies horizantally
-  `align-content`
	- `start`  |  `center`  |  `end`  |  `space-between`  |  `space-around`  |  `space-evenly`
	- applies vertically
```css
.grid-container {
	display: grid;
	grid-template-columns: 200px 250px;
	grid-auto-rows: minmax(150px, auto);
	grid-gap: 20px;
	justify-content: start; 
	/* Note start instead of flex-start, end instead of flex-end, etc. */
	align-content: center;
	height: 100vh;
}
```
example with justify-content: center; 
![[grid-1670457866939.jpeg]]

#### Justify-&-Align-Items
- Justifies/Aligns <u>content</u> within their individual <u>areas</u>  (area may be 1 cell, or multiple cells if spanning across cells)
	- `justify-items` 
		- **`stretch`**  |  `start`  |  `center`  |  `end`
		- applies horizantally/across the row axis
	- `align-items` 
		- **`stretch`**  |  `start`  |  `center`  |  `end`
		- applies vertically/across the column axis
	
```css
.grid-container {
	display: grid;
	grid-template-columns: 200px 250px;
	grid-auto-rows: minmax(150px, auto);
	grid-gap: 20px;
	justify-items: center; 
	align-items: center;
}
```
![[grid-1670457995819.jpeg]]

#### Justify-&-Align-Self
- Overrides group alignment (justify/align items) with custom placement for that item with  `justify-self ` and  `align-self`
```css
.grid-container {
	display: grid;
	grid-template-columns: 200px 250px;
	grid-auto-rows: minmax(150px, auto);
	grid-gap: 20px;
	justify-items: stretch; 
	align-items: stretch;
}

.grid-item-1 {
	align-self: start;
}
```
![[grid-1670458142888.jpeg]]

- & Web dev simplified advice: Using flexbox containers inside of your different grid items –> One of the best ways to layout a website

## Explicit vs Implicit Grid
- `explicit` grid refers to those cells that are defined by the `grid-template-rows` and `grid-template-columns`
- If you have more html content than defined explicitly, these still show up on the page, in an `implicit` grid
- `implicit` grid can be styled using:
	- `grid-auto-rows`
		- value is size `grid-auto-rows: 80px;`
	- `grid-auto-columns`
		- value is size `grid-auto-columns: .5fr;`
	- `grid-auto-flow`  
		- `row`  |  `column`
		- `dense`  can add this keyword to row or column to indicate that you want to minimize blank cells
		- ex: `grid-auto-flow: row dense;`
- Very useful to be able to style auto added rows/columns for when you don’t know how many rows or columns there will be (pulling data from a server, etc.)


## CSS Grid notes from freecodecamp
#refactor 
- The default settings for CSS Grid will create additional rows as needed, unlike Flexbox.
- If you wanted to add more social icons, but keep them on the same row, you would need to update `grid-template-columns` to create additional columns. As an alternative, you can use the `grid-auto-flow` property.
    This property takes either `row` or `column` as the first value, with an optional second value of `dense`. `grid-auto-flow` uses an auto-placement algorithm to adjust the grid layout. Setting it to `column` will tell the algorithm to create new columns for content as needed. The `dense` value allows the algorithm to backtrack and fill holes in the grid with smaller items, which can result in items appearing out of order.
    For your `.social-icons` selector, set the `grid-auto-flow` property to `column`.
- Now the auto-placement algorithm will kick in when you add a new icon element. However, the algorithm defaults the new column width to be `auto`, which will not match your current columns.
    You can override this with the `grid-auto-columns` property. Give the `.social-icons` selector a `grid-auto-columns` property set to `1fr`.
- Much like Flexbox, with CSS Grid you can align the content of grid items with `align-items` and `justify-items`. `align-items` will align child elements along the column axis, and `justify-items` will align child elements along the row axis.
- Your `.text` element is not a CSS Grid, but you can create columns within an element without using Grid by using the `column-width` property.
- Magazines often use justified text in their printed content to structure their layout and control the flow of their content. While this works in printed form, justified text on websites can be an accessibility concern, for example presenting challenges for folks with dyslexia.
    To make your project look like a printed magazine, give the `.text` selector a `text-align` property set to `justify`.
- The images should be within a two column, three row layout. Give the `.image-wrapper` selector a `grid-template-columns` property set to `2fr 1fr` and a `grid-template-rows` property set to `repeat(3, min-content)`. This will give our grid rows that adjust in height based on the content, but columns that remain a fixed width based on the container.
- The `gap` property is a shorthand way to set the value of `column-gap` and `row-gap` at the same time. If given one value, it sets the `column-gap` and `row-gap` both to that value. If given two values, it sets the `row-gap` to the first value and the `column-gap` to the second.
- The `place-items` property can be used to set the `align-items` and `justify-items` values at the same time. The `place-items` property takes one or two values. If one value is provided, it is used for both the `align-items` and `justify-items` properties. If two values are provided, the first value is used for the `align-items` property and the second value is used for the `justify-items` property.