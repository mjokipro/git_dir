from flask import Flask

app = Flask(__name__)

@app.route('/dogs')
def bark():
    return 'Dogs go brk brk'

