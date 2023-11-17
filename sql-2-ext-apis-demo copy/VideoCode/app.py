from flask import Flask, render_template, request
import requests

API_BASE_URL = "http://www.mapquestapi.com/geocoding/v1"

#please note, you may have to register on mapquest for your own API key and replace the key below if it is not working.

key = '4WiuDGgyNC6lAp04txicEbLMUf53z5O0'

app = Flask(__name__)


def get_coords(address):
    res = requests.get(f"{API_BASE_URL}/address",
                       params={'key': key, 'location':  address})
    data = res.json()
    lat = data["results"][0]['locations'][0]['latLng']['lat']
    lng = data["results"][0]['locations'][0]['latLng']['lng']
    coords = {'lat': lat, 'lng': lng}
    return coords


@app.route('/')
def show_address_form():
    return render_template("address_form.html")


@app.route('/geocode')
def get_location():
    address = request.args["address"]
    coords = get_coords(address)
    return render_template('address_form.html', coords=coords)
