from unittest import TestCase

from app import app
from models import db, User, Post, Tag, PostTag

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_tests'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class UserModelTestCase(TestCase):
    """Tests for model for Pets."""

    def setUp(self):
        """Clean up any existing pets."""

        User.query.delete()
        
        self.client = app.test_client()
        
        user = User(first_name="Test123", last_name="Test321", image_url="test-img")
        db.session.add(user)
        db.session.commit()
        
        self.user_id = user.id

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_user(self):
        """create user instance"""
        with self.client:
            
            self.assertEqual(self.user.first_name, "Test123")
            self.assertEqual(self.user.last_name, "Test321")
            self.assertEqual(self.user.image_url, "test-img")
            # # self.assertEquals(user.full_name(), "Test123 Test321")



