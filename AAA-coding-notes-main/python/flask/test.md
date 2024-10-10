
```python
def test_user_signup_fail_name(self):

self.assertRaises(

TypeError,

User.signup,

email="test_user@mail.com",

password="password",

image_url=None

)

def test_user_signup_fail_same_name(self):

"""Test trying to create user with existing username"""

  

with self.assertRaises(IntegrityError):

User.signup(

username="u1",

email="test_user@mail.com",

password="password",

image_url=None

)

db.session.commit()
```