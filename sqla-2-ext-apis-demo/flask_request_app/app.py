from flask import Flask, render_template, request
import requests

API_BASE_URL = "http://www.mapquestapi.com/geocoding/v1"

app = Flask(__name__)


def request_coords(location):
    """Return {lat,lng} from MapQuest for given location."""

    key = '4WiuDGgyNC6lAp04txicEbLMUf53z5O0'
    url = f"{API_BASE_URL}/address?key={key}&location={location}"

    response = requests.get(url)
    r = response.json()

    lat = r['results'][0]['locations'][0]['latLng']['lat']
    lng = r['results'][0]['locations'][0]['latLng']['lng']

    return {"lat": lat, "lng": lng}


@app.route('/')
def home_route():
    """Show form asking for location to geocode."""

    return render_template('home.html')


@app.route('/coords', methods=["POST"])
def get_coords():
    """Handle form submission; return form, showing lat/lng from submission."""
    city = request.form['city']
    coords = request_coords(city)

    return render_template('home.html', coords=coords)
