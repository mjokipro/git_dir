from flask import Flask, session, request, render_template, redirect, make_response, flash, json, jsonify
from helpers import countries_currency_code
import collections
from collections import abc
from collections.abc import Mapping, MutableMapping
collections.MutableMapping = abc.MutableMapping
# import requests.api

# import sys

# if sys.version_info[:2] >= (3, 8):
#     from collections.abc import MutableMapping
# else:
#     from collections import MutableMapping

# import requests
# import requests.api


from flask_debugtoolbar import DebugToolbarExtension

# key names will use to store some things in the session;
# put here as constants so we're guaranteed to be consistent in
# our spelling of these

app = Flask(__name__)
# Make Flask errors be real errors, not HTML pages with error info
app.config['TESTING'] = False

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
app.config['SECRET_KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)



@app.route('/')
def redirect_to_index():
    """redirect to index.html from root"""
    
    return render_template('index.html', countries=countries_currency_code)

@app.route('/call_api')
def call_forex_api():
    """call forex api, and update index.html"""
    
    API_KEY = "f25e3073d016e546572716b3c7ccb7e2"
    conv_from = request.args.get("curr_from")
    conv_to = request.args.get("curr_to")
    amount = request.args.get("amount")
    # url2 = f"https://api.exchangeratesapi.io/v1/symbols?access_key={API_KEY}"
    url = f"https://api.exchangerate.host/convert?from={conv_from}&to={conv_to}&amount={amount}&places=2&access_key=API_KEY"
        
    
    response = requests.api.get(url)
    r = response.json()
    print("********")
    print(r)
    print("********")
    
    return jsonify({ "curr_from": conv_from, "curr_to": conv_to, "amount": amount })

if __name__ == '__main__':
    app.run()