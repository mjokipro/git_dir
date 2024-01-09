## static vs. positioned
- Typically, HTML is rendered in a top-down manner. Elements at the top of the code are positioned at the top of the page. However, many times you may want to move the elements to different positions. You can do this with the `position` property.
- Default position is `static` . This means the element appears at the normal place in “flow”, where it would normally appear.
- All non-static are considered `positioned`

## ‘positioned’ properties
### relative
-   _relative_ to normal position (via top, right, bottom, left)
	- Note you can use these selectors (top, right, bottom, left) to “nudge” an element from it’s original position.
-  Takes same space as if it were static & in normal flow. i.e. the element takes up space where it <u>originally</u> appeared, not where it is shown
- This can be particularly helpful if you have a button, and as a hover effect you want it to move down & left. Positioning this element relative, and changing the top/left amounts on the hover means that other elements on the page won’t shift in response to this effect. (just make sure you have enough margin around that the button won’t overlap nearby elements)
```css
.selector {
	position: relative;
	/* default top/right/bottom/left of original position */
}

.selector:hover {
	top: 2rem;
	left: 2rem;
}
```

### absolute
-   _absolute_ position from _closest positioned ancestor_
    -   other relative settings, like width, come from that now, too
-   removed from flow, takes up no space
```css
.selector {
	position: absolute;
	top: -2.25rem;
	left: 0.5rem;
}
```
- An `absolute` position takes the element out of that top-down document flow and allows you to adjust it relative to its container.
- For top, left, etc. positioning, count starts from the first element with a relative position that it can find. Usually, you want this to be the parent element. 
- ! ***This may require changing the position of the parent element to relative.**
- Above example would be:
	- 2.25rem up from the parent element
	- 0.5rem to the right from the parent element
- Other resource for understanding: [CSS Tricks - Position](https://css-tricks.com/almanac/properties/p/position/)

### fixed
-   absolutely positioned from viewport (stays there on scroll)
-   removed from flow, takes up no space
```css
.selector {
	position: fixed;
	top: 0;
}
```
- Fixes selected item to top of viewport

### sticky
- A combination of absolute and fixed; this is useful for allowing something to scroll on the screen, but then fix to the viewport before it scrolls out of sight.
```css
.selector {
	position: sticky;
	top: 0;
}
```


## Adjusting position with transform
- To further adjust the positioning of your selected element, you can translate the object. 
```css
.selector {
	position: absolute;
	top: -2.25rem;
	left: 0.5rem;
	transform: translate(x, y);
}
```
- This moves the object relative to itself. 
- X direction goes  - (left), + (right) 
- Y direction goes  - (up), + (down)

## Adjusting layer with z-index
The `z-index` property is used to create "layers" for your HTML elements. If you are familiar with image editing tools, you may have worked with layers before. This is a similar concept.

Elements with a higher `z-index` value will appear to be layered on top of elements with a lower `z-index` value. This can be combined with the positioning in the previous lesson to create unique effects.

- & z-index only works if you have a specified position

