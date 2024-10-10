from unittest import TestCase

from app import app
from models import db, User, Post, Tag

class PostViewsTestCase(TestCase):
    """Tests for views for Posts resource."""

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
        # User.query.delete()
        Post.query.delete()
        # # PostTag.query.delete()
        
        self.client = app.test_client()
        
        'create test user'
        user = User(first_name="Test123", last_name="Test321", image_url='test-img')
        
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id
        self.user = user
        
                

    def tearDown(self):
        """Clean up any fouled transaction."""

        # User.query.delete()
        db.session.rollback()
        
    def test_show_add_post_form(self):
        with self.client:
            """Test 'GET' route that shows new post form for user."""
            resp = self.client.get(f"/users/{ self.user_id }/posts/new")
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Test123 Test321", html)
            self.assertIn('<div class="form-check"', html)

    
    def test_post_add_post_form(self):
        with self.client:
            """Test 'POST' route for adding a new post."""
            # user = User.query.get(self.user_id)
            test_user = User.query.get_or_404(self.user_id)
            
            resp = self.client.post(f"/users/{ test_user.id }/posts/new", data={"title": "Test-title", "content": "Test-content"}, follow_redirects=True)
                                    # follow_redirects=True)
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(test_user.first_name, 'Test123')
            self.assertIn("Test123", html)
            
    # def test_show_post_detail(self):
    #     with self.client:
    #         """Test 'GET' route that shows details for a post. """
            
            # user = User.query.get_or_404(self.user_id)
            # post = post.f"{ user.id }".user_id
            # resp = self.client.get(f"/posts/{  }")

        
        