## With existing code

### Start with the Classes
- Investigate the Classes first, since the rest of the app tends to depend on them
- Notice how things are currently structured and take notes
	- When adding new code, think:
		- *Where is the best place to put this?*
- Learn what these classes do and how they work. A good way to feel out a codebase is trying it out in a console:
```python
>>> import wordlist
>>> help(wordlist.WordList)    #  *(press 'q' to quit that)*
>>> import boggle
>>> help(boggle.BoggleGame)
```
- You can make instances of these classes and experiment with the API for them:
```python
>>> game = boggle.BoggleGame()
>>> game.board
<BoggleGame board=HEYXZ.ERSTA.DFSTE.DFDSF.EAGST played_words=set()>

>>> game.check_word_on_board('HEY')
True

>>> game.play_and_score_word('CAT')
1
>>> game.play_and_score_word('HIPPO')
2
>>> game.score
3
```


## From Scratch

## Build any Classes/logic first
- Start with building the classes and related logic first
- Write docstrings for each class and method
- Write console.debug() with expected inputs for each class and method
- When ready to code:
	- Start with the “leaves” – the smallest ‘end’ function that you’ll be able to test on its own without relying on any other functions
	- Then build up to any fx that rely on those leaves, etc. Testing each along the way, until the logic is complete. 
	- Once complete, test it as a whole.
