from unittest import TestCase

from app import app
from models import db, User, Post, Tag, PostTag

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
        # PostTag.query.delete()
        # Tag.query.delete()
        
        self.client = app.test_client()
        
        # 'create test user'
        # tag = Tag(name='comforted')
        
        # db.session.add(tag)
        # db.session.commit()

        # self.tag_id = tag.id
        # self.tag = tag
        
                

    def tearDown(self):
        """Clean up any fouled transaction."""

        # User.query.delete()
        db.session.rollback()
        

            
    def test_show_new_tag_form(self):
        with self.client:
            """Test 'GET' route that shows new tag form."""
            
            resp = self.client.get("/tags/new")
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Create A Tag", html)
            
    def test_post_add_tag(self):
        with self.client:
            """Test 'POST'"""
            
            resp = self.client.post('/tags/new', data={"name": "Test-tag"})
                                    # follow_redirects=True)
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Test-tag", html)
            