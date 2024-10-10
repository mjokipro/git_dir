- Designers of HTML have agreed that future html attributes will always be one word
	- Therefore, within our own projects now, attributes that are multiple words should be “future-proof” on this aspect even as HTML is further developed
- `data-` attribute has been adopted as a good way to store data on an element when needed, with the name of the type of data added after the dash
- example:
```html
<section data-show-id=2839482938>
	...
</section>
```

- This show-id can then be accessed later when needed

### Accessing data on data-attributes

- [jQuery](data-attributes-with-jQuery) can be used to access this data later