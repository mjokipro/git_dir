![[display-1677505368810.jpeg]]

## Inline
-   Only takes as much space as needed
-   Ignores width and height properties, and minWidth/maxWidth properties, etc.
-   Next inline item is side-by-side

## Block
-   100% of parent width _unless_ set via width or max-width
-   Can modify width and height with CSS
-   Next item is on a separate line

## Inline-block
- Side-by-side, like inline; respects width and height, like block
- Only takes up the width of the content unless width is explicitly stated
- Treated as if it was text - to align inline-block elements, can just set the text-align property of the parent element
- So in below example, text-align property is not visibly different 
```html
<article class="item">
	<p class="flavor">French Vanilla</p>
	<p class="price">3.00</p>
</article>
```

```css
.item p {
display: inline-block;
}

.flavor {
text-align: left;
}

.price {
text-align: right;
}
```
![[Screen Shot 2022-11-10 at 8.15.51 AM.png]]

## none
- Don’t show, don’t take up any space

## flex
- Enables [Flexbox](flex-box)
