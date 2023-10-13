from flask import Flask, session, request, render_template, redirect, make_response, flash
import json
import requests

from flask_debugtoolbar import DebugToolbarExtension

# key names will use to store some things in the session;
# put here as constants so we're guaranteed to be consistent in
# our spelling of these

app = Flask(__name__)
app.config['SECRET_KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)



@app.route('/')
def redirect_to_index():
    """redirect to index.html from root"""
    
    return render_template('index.html')

@app.route('/call_api', methods=["POST"])
def call_forex_api():
    """call forex api, and update index.html"""
    
    API_KEY = "f25e3073d016e546572716b3c7ccb7e2"
    url = "http://api.exchangerate.host/live?access_key=f25e3073d016e546572716b3c7ccb7e2"
    cfrom = request.form.get("cfrom")
    cto = request.form.get("cto")
    amount = request.form.get("amount")
    
    client = app.test_client()
    
    
    response = requests.get(url)
    
    
    
    # request = request.get('http://api.exchangerate.host/live?access_key=f25e3073d016e546572716b3c7ccb7e2')
    
    return f"<p>cfrom: { cfrom }, cto: { cto }, amount: { amount }, {response}</p>"

if __name__ == '__main__':
    app.run()