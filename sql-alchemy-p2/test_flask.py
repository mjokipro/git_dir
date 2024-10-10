from unittest import TestCase

from app import app
from models import db, User

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_tests'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserViewsTestCase(TestCase):
    """Tests for views for users."""

    def setUp(self):
        """Add sample user."""

        User.query.delete()
        # 'TestPet' created here
        user = User(first_name="TestPet", last_name="dog", image_url='bla')
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id
        self.user = user

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_list_pets(self):
        with app.test_client() as client:
            resp = client.get("/")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            # look for 'TestPet' created in setUp()
            self.assertIn('TestPet', html)

    def test_show_pet(self):
        # """this tests the dynamic detail route <int:pet_id>"""
        with app.test_client() as client:
            resp = client.get(f"/{self.pet_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>TestPet</h1>', html)
            self.assertIn(self.pet.species, html)

    def test_add_pet(self):
        with app.test_client() as client:
            d = {"name": "TestPet2", "species": "cat", "hunger": 20}
            resp = client.post("/", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("<h1>TestPet2</h1>", html)
