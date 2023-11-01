from unittest import TestCase

from app import app
from models import db, User

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_tests'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class PetModelTestCase(TestCase):
    """Tests for model for Pets."""

    def setUp(self):
        """Clean up any existing pets."""

        User.query.delete()

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_user(self):
        user = User(first_name="TestPet", last_name="dog", image_url="bla")

        self.assertEqual(user.first_name, "TestPet")


        db.session.add(user)
        db.session.commit()

      
