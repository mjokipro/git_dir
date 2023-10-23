from unittest import TestCase
from app import app


app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class routes_tests(TestCase):
    
    def test_form(self):
        with app.test_client() as client:
            
            resp = client.get("/")
            
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Foreign Currency Exchange</h1>', html)
            
    def test_form_submit(self):
        with app.test_client() as client:
            resp = client.post("/", data={"curr_from": "USD", "curr_to": "EUR", "amount": 50})
            
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIsNotNone(html)
            self.assertIn('<p>Your amount:         50.0</p>', html)
            self.assertIn('<p>Your currency from:  USD</p>', html)
            self.assertIn('<p>Your currency to:    EUR</p>', html)
            