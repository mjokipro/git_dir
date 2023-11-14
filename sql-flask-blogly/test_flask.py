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

        # # tag_ids = [int(num) for num in request.form.getlist("tags")]
        # # tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

        self.user_id = user.id
        self.user = user

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
            # Look in
            self.assertIn('<h1>Create a user</h1>', html)

    def test_new_users_post(self):
        """test post"""
        with app.test_client() as client:
            
            resp = client.post("/users/new",
                data={"first_name": "Test123", "last_name":"Test321"})
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 400)
            # Look in

    def test_users_show(self):
        """Test show."""
        with app.test_client() as client:

            user = User.query.all()
            
            resp = client.get(f"/users/{ user[0].id }")
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<button class="btn btn-primary"', html)
            
    def test_users_edit_show(self):
        """Test users edit page."""
        with app.test_client() as client:
        
            user = User.query.all()
            
            resp = client.get(f"/users/{ user[0].id }/edit")
            html = resp.get_data(as_text=True)
        
            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<h1>Edit Test123 Test321</h1>', html)
           
    def test_users_post_new(self):
        """Test users new post page."""
        with app.test_client() as client:
            
            user = User.query.all()
            tags = Tag.query.all()
            
            resp = client.get(f"/users/{ user[0].id }/posts/new")
            html = resp.get_data(as_text=True)
        
            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<i>Test123 Test321</i>', html)
           
    def test_tags(self):
        """Test tags index page."""
        with app.test_client() as client:
            
            tag = Tag.query.all()
            
            resp = client.get("/tags")
            html = resp.get_data(as_text=True)
        
            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<a class="btn btn-primary"', html)

    def test_tags_new(self):
        """Test tags new page."""
        with app.test_client() as client:
            
            tag = Tag.query.all()
            
            resp = client.get("/tags/new")
            html = resp.get_data(as_text=True)
        
            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<h1>Create A Tag</h1>', html)
           
    