from flask import Flask, render_template, request
from mapquest import data, key, account_sid, auth_token

import requests

API_BASE_URL = "http://www.mapquestapi.com/geocoding/v1"

#please note, you may have to register on mapquest for your own API key and replace the key below if it is not working.


app = Flask(__name__)

@app.route("/")
def show_address_form():
    """Show form for entering address."""
    
    return render_template('address_form.html')

@app.route("/geocode")
def get_location():
    
    address = request.args["address"]
    
    coords = get_coords(address)
    
    return render_template('address_form.html',  coords=coords)
    
def get_coords(address):
    """Return a set of coordinates for a location."""
        
    res = requests.get(f"{API_BASE_URL}/address",
                    params={'key': key, 'location': address })

    data = res.json()

    lat = data['results'][0]['locations'][0]['latLng']['lat']
    lng = data['results'][0]['locations'][0]['latLng']['lng']

    # import pdb
    # pdb.set_trace()
    print("###  {'lat': lat, 'lng': lng}  ###")
    print(lat, lng)
    print("######")

    coords = {'lat': lat, 'lng': lng}

    return coords

def get_twil(account_sid, auth_token):
    """Send message with Twilio."""
    
    


if __name__ == '__main__':
    app.run(debug=True)