import requests

res = requests.get(
            "https://itunes.apple.com/search",
            params={"term": "billy bragg", "limit": 3}
       )


