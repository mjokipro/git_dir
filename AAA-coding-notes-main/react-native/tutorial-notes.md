
---
date: 2023-05-23
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## Components

### View

- View like div in react
- can use `SafeAreaView` to add padding on top & bottom to account for notch at top of phone

### Text

- Text should always be wrapped in Text component

<u>Attributes:</u>
- numberOfLines
- onPress
	- can write inline fx
	- or call back –> use handle for convention
		- handlePress
		- handleClick
- style:
	- css like styles

### Image

- Can display local or network images
	- local: from assets folder
	- network: download from internet
		- need to specify dimensions 

<u>Attributes:</u>
- source
	- local: 
		- require(‘./assets/icon.png’)
		- slows down app - only use for images you really have to use
	- network:
	  ```
	  {{
	    width: 200,
	    height: 300,
	    uri: "https://picsum.photos/200/300"
	  }}
		```

### Touchables

- can make anything touchable, just wrap it in one of these
- TouchableWithoutFeedback
- TouchableOpacity
	- reduces opacity fo what you touch
- TouchableHighlight

- there are ways to detect type of device and use diff touchables

<u>Attributes:</u>
- onPress
- onLongPress


### Buttons

- can use self closing syntax
- defaults on each platform is different
	- color orange
		- changes text on ios, background android

<u>attributes:</u>
- onPress


### Alert

- alert function in browsers also works in react native
- gives pop up alert box
- default title: Alert, button “ok”
- Alert is API

methods:
- Display message: Alert.alert(
  “my title”, “my messages”, `[
  {text: "yes", onPress: () => console.log(“yes”)}, 
   {text: "no", onPress: () => console.log(“no”)}, 
   ]`
  )
- Alert.prompt


## Platform Component

- Import Platform from react-native

can specify for stylesheets
```js
const styels = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: Platform.OS === "android" ? 20 : 0
		// BETTER: calc height of status bar and set this
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
	}
})
```


