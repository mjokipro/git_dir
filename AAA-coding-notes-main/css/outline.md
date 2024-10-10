Outline is like border …

-   but are outside of borders, “float above” the border.
-   but never take up space. Does not change the layout in any way
```css
div:hover {
  outline: solid 5px red;
  outline-offset: 5px;
}
```

Often most used for hover effects, so things don’t “move”