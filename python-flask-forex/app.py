from flask import Flask, session, request, render_template, redirect, make_response, flash
import json
# import requests

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

@app.route('/call_api')
def call_forex_api():
    """call forex api, and update index.html"""
    
    # API_KEY = "f25e3073d016e546572716b3c7ccb7e2"
    conv_from = request.args.get("cfrom")
    conv_to = request.args.get("cto")
    amount = request.args.get("amount")
    url = f"https://api.exchangerate.host/convert?from={conv_from}&to={conv_to}&amount={amount}&places=2"
        
    req = requests.get(url)
    
    print(req)
    
    return f"<p>cfrom: { conv_from }, cto: { conv_to }, amount: { amount }, ,</p>"

if __name__ == '__main__':
    app.run()