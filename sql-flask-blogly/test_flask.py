from unittest import TestCase

from app import app
from models import db, User, Post, Tag

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_tests'

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserViewsTestCase(TestCase):
    """Tests for views for Users."""

    def setUp(self):
        """Add sample user."""

        User.query.delete()
        Post.query.delete()
        Tag.query.delete()
        # # PostTag.query.delete()
        
        # 'test' created here
        user = User(first_name="Test123", last_name="Test321", image_url='test-img')
        db.session.add(user)
        db.session.commit()

        tag = Tag(name="TestTag")
        db.session.add(tag)
        db.session.commit()
        
        post = Post(title="TestTitle", content="TestContent", user=user, tags=[tag])
        db.session.add(post)
        db.session.commit()
        # # tag_ids = [int(num) for num in request.form.getlist("tags")]
        # # tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()


        
        self.user_id = user.id
        self.user = user
        
        self.tag = tag
        
        self.post = post

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_list_users(self):
        with app.test_client() as client:
            resp = client.get("/users")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            # look for 'TestPet' created in setUp()
            self.assertIn('Test123', html)
            
    def test_new_users(self):
        with app.test_client() as client:
            resp = client.get("/users/new")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            # look for 'TestPet' created in setUp()


    # # def test_post(self):
    # #    """test post"""
        
        