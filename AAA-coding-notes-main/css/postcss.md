- Javascript tool that allows use of plugins 
- Is actually just a transpiler (not a pre or post processer, despite the name) that turns PostCSS plugin syntax into vanilla CSS
- Fully customizable, and has fast build times compared to other preprocessers. 

## Setting up postcss
1. `npm init`
2. `npm install --save-dev postcss postcss-cli`
	1. In your `package.json` file that was created, add script for  `"postcss:watch"`
```js
{
	"name": "nexter",
	// ... etc.
	"scripts": {
		"postcss:watch": "postcss src/styles.css --dir public --watch"
	},
	// ... etc.
}
```
1. `npm i -D postcss-import postcss-preset-env cssnano postcss-nested postcss-custom-media postcss-media-minmax autoprefixer`
	1. note shortcuts `i` for `install`, `-D` for `--save-dev`
2. Then need to create a configuration file `postcss.config.js`
	1. In the `postcss.config.js` file, add installed plugins.
	   ```js
module.exports = {
	plugins: [
		require("postcss-import"), // Allows postcss imports
		require("postcss-preset-env")({stage: 1}), // Use of future CSS, option for stage
		require("cssnano"), // Minimizes CSS code to fewer lines/ removes line breaks
		require("postcss-nested"),
		require("postcss-custom-media"),
		require("postcss-media-minmax"),
		require("autoprefixer")
	],
};
```
4. Check that you have all partials directories & files created that you are likely to want (to save yourself time by not having to reload the `postcss:watch` command later)
5. Check that you have imported all the partials files into your `styles.css` 
6. `npm run postcss:watch`    <u>in the same project folder in the terminal</u>
7. Check that your `index.html` file is linked to `public/styles.css`


## Plugins 
- There are many many plugins, but here are the more common/popular ones:
### postcss-preset-env
- Package of many plugins that allows use of “future” CSS
#### Stages
- Stage 0
	- Very experimental, Maybe don’t want to play with this, unclear if it will be a part of css
- Stage 1
	- Still experimental
	- As of 1/2023, nesting is still in stage 1, was also in stage 1 in Nov 2021
- Stage 2
	- Default setting
	- Going to be implemented into CSS, pretty safe to use
- Stage 3
	- 
- Stage 4
	- Just checking browser compatibility
	- Stable

### postcss-import
### postcss-nano
### postcss-nested
- SASS like nesting
- Best for BEM naming
### postcss-nesting
- Nests with space required between (not good for BEM naming)
### postcss-custom-media
- For media queries that also allow use of CSS custom variables
### postcss-media-minmax
- For more readable media queries
### autoprefixer
- Allows writing CSS rules without vendor prefixes
- Note: recommends use with assets build tools (instead of plugin)
