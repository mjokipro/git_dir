from flask import Flask, session, request, render_template, redirect, make_response, flash, json, jsonify
import collections
from collections import abc
from collections.abc import Mapping, MutableMapping
collections.MutableMapping = abc.MutableMapping
import requests

from flask_debugtoolbar import DebugToolbarExtension

# key names will use to store some things in the session;
# put here as constants so we're guaranteed to be consistent in
# our spelling of these

app = Flask(__name__)

app.config['SECRET_KEY'] = "never-tell!"

debug = DebugToolbarExtension(app)

@app.route("/")
def converter_form():
    """load form"""
     
    return render_template("index.html")


@app.route("/", methods=[ "POST"])
def converter():
    """redirect to index.html from root"""       

    curr_from = request.form['curr_from'].upper()
    curr_to = request.form['curr_to'].upper()
    amount = float(request.form['amount'])
    
    url4 = f"http://api.exchangerate.host/convert?access_key=f25e3073d016e546572716b3c7ccb7e2&from={curr_from}&to={curr_to}&amount={amount}"
         
    response = requests.get(url4)
    app.logger.info(url4)
    app.logger.info(response)
    
    result = response.json()['result']
    # import pdb; pdb.set_trace()
    
    app.logger.info(result)
    
    if result and curr_from and curr_to and amount > 0:
         
        return render_template('result.html', curr_from=curr_from, curr_to=curr_to, amount=amount, result=result)
    
    return render_template("index.html")

if __name__ == '__main__':
    app.run()