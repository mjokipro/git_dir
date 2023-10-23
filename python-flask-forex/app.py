from flask import Flask, session, request, render_template, redirect, make_response, flash, json, jsonify
from helpers import countries_currency_code
import collections
from collections import abc
from collections.abc import Mapping, MutableMapping
collections.MutableMapping = abc.MutableMapping
import requests
# from urllib.request import urlopen


from flask_debugtoolbar import DebugToolbarExtension

# key names will use to store some things in the session;
# put here as constants so we're guaranteed to be consistent in
# our spelling of these

app = Flask(__name__)
# Make Flask errors be real errors, not HTML pages with error info
app.config['TESTING'] = False

# This is a bit of hack, but don't use Flask DebugToolbar
# app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
app.config['SECRET_KEY'] = "never-tell!"
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True

debug = DebugToolbarExtension(app)


@app.route("/")
def converter_form():
    """call api, load currency codes into drop-down menus"""
    
    
    
    return render_template("index.html")


@app.route("/", methods=[ "POST"])
def converter():
    """redirect to index.html from root"""       

    print("converter()")
    print("")
    print("")
    print("")
    print("")

    curr_from = request.form['curr_from'].upper()
    curr_to = request.form['curr_to'].upper()
    amount = float(request.form['amount'])
    
    url4 = f"http://api.exchangerate.host/convert?access_key=f25e3073d016e546572716b3c7ccb7e2&from={curr_from}&to={curr_to}&amount={amount}"
        
    
    response = requests.get(url4)
    app.logger.info(url4)
    app.logger.info(response)
    
    print("BBBBBBBBEFORE RRRRRRRRRATE")
    result = response.json()['result']
    # import pdb; pdb.set_trace()

    print("*****")
    # print(f"response: {response.text}")
    
    print(result)
    print("*****")
    
    app.logger.info(result)
    
    if result and curr_from and amount > 0:
        # print("*******")
        # print(result)
        # print("*******")
         
        return render_template('result.html', result=result)
    
    return render_template("index.html")

if __name__ == '__main__':
    app.run()