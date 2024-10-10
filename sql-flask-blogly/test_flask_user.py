from unittest import TestCase

from app import app
from models import db, User, Post, Tag

class UserViewsTestCase(TestCase):
    """Tests for views for Users."""

    @classmethod
    def setUpClass(cls):
        """Connect & create postgresql db - set up class features."""
        
        app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test_db'
        app.config['SQLALCHEMY_ECHO'] = False
        app.config['TESTING'] = True
        app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
        app.config['WTF_CSRF_ENABLED'] = False
        
        db.create_all()

    @classmethod
    def tearDownClass(cls):
        """Drop db after tests."""     
        db.drop_all()
 
    def setUp(self):
        """Add sample user, then a sample post for that user_id."""
        User.query.delete()
        Post.query.delete()
        # Tag.query.delete()
        # # PostTag.query.delete()
        
        self.client = app.test_client()
        
        # 'create test user'
        user = User(first_name="Test123", last_name="Test321", image_url='test-img')
        
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id
        self.user = user
        
        # post = Post(title="Test-title", content="Test-content")

        # db.session.add(post)
        # db.session.commit()

        # self.post_id = post.id
        # self.post = post

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_show_all_users_list(self):
        """Test 'GET' route that shows list of all users."""
        with self.client:
            resp = self.client.get("/users")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Test123', html)
            
    def test_show_new_user_form(self):
        """Test 'GET' route that shows form for adding new user."""
        with self.client:
            resp = self.client.get("/users/new")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Create a user</h1>', html)

    def test_post_new_user_form(self):
        """Test 'POST' route that creates a new user."""
        with self.client:
            resp = self.client.post("/users/new",
                data={"first_name": "Test123", "last_name":"Test321"})
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 400)

    def test_user_show(self):
        """Test 'GET' route that returns info for a single user."""
        with self.client:
            # user = User.query.get(self.user_id)
            
            resp = self.client.get(f"/users/{ self.user_id }")
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<button class="btn btn-primary"', html)
            
    def test_user_edit_show_form(self):
        """Test 'GET' route for showing user edit form."""
        with self.client:
        
            user = User.query.all()
            
            resp = self.client.get(f"/users/{ user[0].id }/edit")
            html = resp.get_data(as_text=True)
        
            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<h1>Edit Test123 Test321</h1>', html)
           
    def test_add_new_user_post(self):
        """Test 'GET' route that shows new post form."""
        with self.client:
            
            user = User.query.all()
            tags = Tag.query.all()
            
            resp = self.client.get(f"/users/{ user[0].id }/posts/new")
            html = resp.get_data(as_text=True)
        
            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<i>Test123 Test321</i>', html)
           
    def test_show_all_tags_list(self):
        """Test 'GET' route that shows all avail tags."""
        with self.client:
            
            tag = Tag.query.all()
            
            resp = self.client.get("/tags")
            html = resp.get_data(as_text=True)
        
            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<a class="btn btn-primary"', html)

    def test_show_add_tag_form(self):
        """Test 'GET' route that shows form for adding new tag."""
        with self.client:
            
            tag = Tag.query.all()
            
            resp = self.client.get("/tags/new")
            html = resp.get_data(as_text=True)
        
            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<h1>Create A Tag</h1>', html)
           
    def test_show_tags(self):
        """Show all tags."""
        with self.client:
            
            tag = Tag(name='Test-tag')
            db.session.add(tag)
            db.session.commit()
            
            self.tag_id = tag.id
            
            resp = self.client.get(f"/tags/{ self.tag_id }/edit")
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('Test-tag', html)
            
    def test_show_add_post_form(self):
        with self.client:
            """Test 'GET' route that shows new post form for user."""
            resp = self.client.get(f"/users/{ self.user_id }/posts/new")
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Test123 Test321", html)
            self.assertIn('<div class="form-check"', html)

    # def test_show_post_tags(self):
    #     """Post tag."""
    #     with self.client:
            
    #         # tag = Tag.query.get(self.tag_id)
            
    #         resp = self.client.post(f"/tags/{ self.user_id }/edit", data={"name": "Test-tag-edit"})
    #         html = resp.get_data(as_text=True)
            
    #         self.assertEqual(resp.status_code, 302)
            
    def test_post_new_post(self):
        """Test 'POST' route for new post."""
        with self.client:
            
            # user = User.query.get(self.user_id)
            post = Post.query.filter_by(user_id=self.user_id)

            
            self.post_id = post.id
            
            resp = self.client.post(f"/posts/{ self.post_id }/edit", data={"title": "edit-post", "content": "edit-content", "user":  self.user_id }, follow_redirects=True)
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('edit-post', html)
        
    
