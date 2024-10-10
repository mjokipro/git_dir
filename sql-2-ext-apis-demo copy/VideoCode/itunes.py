import requests

term = "Madonna"

res = requests.get(
    'https://itunes.apple.com/search', params={'term': term, 'limit': 5})


data = res.json()

# the commented out code used to work, but iTunes has updated it's API
# we are now using result.get, because if there is no dictionary entry, it will return the specified string.
# for result in data['results']:
#     print(result['trackName'])
#     print(result['collectionName'])
for result in data['results']:
    print(result.get('trackName', 'No track name!'))
    print(result.get('collectionName', 'No collection name!'))


data = {
    'username': 'chickenz',
    'tweets': [
        'hello!', 'goodbye!', 'bock bock!', {
            'id': 1,  'text': 'my first tweet!'}
    ]
}

requests.post('https://en27bnye2btkl.x.pipedream.net', json=data)
