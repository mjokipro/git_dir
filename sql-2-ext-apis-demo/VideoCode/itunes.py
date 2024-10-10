import requests

# term = 'Madonna'

# res = requests.get(
#     'https://itunes.apple.com/search?term=jack+johnson&limit=25',
#     params={'term': term, 'limit': 5})

# data = res.json()

# for result in data['results']:
#     print(result['trackName'])
    
data_2 = {
    'username': 'bla',
    'tweets': [
        'hello!', 'goodbye', {
            'id':1, 'text':'my first tweet!'}
    ]
}

res_2 = requests.post('https://eneuef8dadn.x.pipedream.net', json=data_2)
res_3 = requests.post('https://eneuef8dadn.x.pipedream.net', data=data_2)