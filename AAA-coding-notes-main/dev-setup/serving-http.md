- Just opening an HTML file in browser uses file protocol, not http
	- Some things don’t work same (esp security-related stuff)
- It’s often useful to start a simple HTTP server for testing.
- & Navigate to the folder you want to serve in terminal, and start a simple, local HTTP server with Python:
```python
python3 -m http.server
```
Serve files in current directory (& below):
```python
$ python3 -m http.server
'''
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
'''
```
- In web browser, manually type url `http://127.0.0.1:8000/index.html`
	- Note: `http://`  NOT `https://`
- ! DON’T USE LIVE SERVER
- & Always have debug console open with disable cache checked when building apps.
- Stop server at end of day with control + C