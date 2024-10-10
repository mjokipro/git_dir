import requests

key = '4WiuDGgyNC6lAp04txicEbLMUf53z5O0'

response = requests.get('http://www.mapquestapi.com/geocoding/v1/address',
                        params={'key': key, 'location': '123 Main St.'})
