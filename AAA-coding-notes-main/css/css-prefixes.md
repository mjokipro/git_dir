- CSS prefixes, otherwise known as Vendor prefixes, are **a set of browser-specific keywords you need to append to non-standard or experimental CSS properties for cross-browser compatibility of your styles**.
	- `-webkit-`
	- `-mox-`
	- `-o-`
	- `-ms-`

- Some parts of CSS are experimental or non-standard, and need a prefix (maybe more than one? #questions) to function correctly in that browser.
	- `display: flex;`
	- `transform: scale(1.2);`
	- `animation: blink .3s ease-in-out;`
- Can check if a property needs a prefix on [caniuse.com](https://caniuse.com/)
	- Can also use autoprefixer with postcss, which will automate adding vendor prefixes.

https://hashnode.com/post/what-are-css-prefixes-and-when-should-you-use-them-cjr6suziy006q5ts1mg465vra