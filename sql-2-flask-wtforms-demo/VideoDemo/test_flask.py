from unittest import TestCase

from app import app
from models import db, Employee, Department

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///employees_tests'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

# Don't req CSRF for testing
app.config['WTF_CSRF_ENABLED'] = False

db.drop_all()
db.create_all()

class SnackViewsTestCase(TestCase):
    """Tests for views for snacks."""
    
    def test_snack_add_form(self):
        with app.test_client() as client:
            resp = client.get('/snacks/new')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200) 
            self.assertIn('<form', html)
            self.assertIn('<h1>New Snack Form</h1>', html)
            
    def test_snack_add(self):
        with app.test_client() as client:
            d = {"name": "Test123", "price": "1.23"}
            resp = client.post("/snacks/new", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Test123", html)
            self.assertIn("1.23", html)
            
class EmployeeViewTestCase(TestCase):
    """Tests for Employee model."""
    
    def setUp(self):
        Employee.query.delete()
        Department.query.delete()
        self.client = app.test_client()
        
        dept = Department(dept_code="mktg", dept_name="Marketing")
        db.session.add(dept)
        db.session.commit()
        emp = Employee(name="Test123", state="AL", dept_code="mktg")
        db.session.add(emp)
        db.session.commit()
        
        self.emp_id = emp.id
        
    def tearDown(self):
        db.session.rollback()
        
    def test_employee_form(self):
        with self.client:
            resp = self.client.get("/employees/new")
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Test123", html)
        
    
