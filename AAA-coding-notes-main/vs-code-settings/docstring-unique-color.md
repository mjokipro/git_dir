
---
date: 2023-05-01
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm', 'brit']
---

[@Huse](https://rithmstudents.slack.com/team/U04FN9ZHTDF) and anyone else interested! Below are the VS Code settings I added to specify a different color for Python and JavaScript docstring/multi-line comments than is used for regular comments.IMPORTANT: Nord is my VS Code theme, you should replace “[Nord]” with your theme: “[name-of-your-theme]”(of course also update the foreground to be your color preference!)

```
  "editor.tokenColorCustomizations": {
    "[Nord]": {
        "textMateRules": [
          // JavaScript multi-line comments
          {
            "scope": ["comment.block.documentation.js punctuation.definition.comment.js"],
            "settings": {"foreground": "#B48EAD"}
          },
          {
            "scope": ["comment.block.documentation.js"],
            "settings": {"foreground": "#B48EAD"}
          },
          // Python multi-line comments
          {
            "scope": ["string.quoted.docstring.multi.python"],
            "settings": {"foreground": "#B48EAD"}
          },
        ]
    }
  }
```


**Open VS Code JSON settings file:**Open the VS Code command palette with:  

-   Mac: Command+Shift+p
-   Windows & Linux: Ctrl+Shift+p

Start typing and select the following:  

-   Preferences: Open User Settings (JSON)

I’m also including the links I found helpful when researching/making these updates:[https://code.visualstudio.com/docs/getstarted/themes#_editor-syntax-highlighting](https://code.visualstudio.com/docs/getstarted/themes#_editor-syntax-highlighting)  
[https://code.visualstudio.com/api/extension-guides/color-theme](https://code.visualstudio.com/api/extension-guides/color-theme)  
[https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#textmate-tokens-and-scopes](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#textmate-tokens-and-scopes)