from unittest import TestCase

from app import app
from models import db, Todo

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///todos_db'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

db.drop_all()
db.create_all()

class TodoViewsTestCase(TestCase):
    """Test views for todos."""
    
    def setUp(self):
        """Make demo data."""
        
        Todo.query.delete()
        db.session.commit()
        self.client = app.test_client()
        
        todo = Todo(title='Test-title')
        db.session.add(todo)
        db.session.commit()
        self.todo_id = todo.id
        
    def tearDown(self):
        """Clean up records."""
        
        db.session.rollback()
        
    def test_all_todos(self):
        with self.client:
            """Test 'GET' show all todos view."""
            
            resp = self.client.get("/api/todos")
            self.assertEqual(resp.status_code, 200)
            
            self.assertEqual(
                resp.json,
                { 'todos': [{
                    'id': self.todo_id,
                    'title': 'Test-title',
                    'done': False
                }]})
            
    def test_get_single_todo(self):
        with self.client:
            """Test 'GET' show a single todo."""
            
            resp = self.client.get(f"/api/todos/{ self.todo_id }")
            self.assertEqual(resp.status_code, 200)
            
            self.assertEqual(
                resp.json,
                { 'todo': {
                    'id': self.todo_id,
                    'title': 'Test-title',
                    'done': False}})
            
    def test_post_add_todo(self):
        with self.client:
            """Test 'POST' add a todo."""
            resp = self.client.post(
                "/api/todos", json={
                    "title": "Test-title2",
                    "done": True,
                    })
            
            self.assertEqual(resp.status_code, 201)
            
            self.assertIsInstance(resp.json['todo']['id'], int)
            del resp.json['todo']['id']
            
            self.assertEqual(
                resp.json,
                { "todo":
                    { 'title': 'Test-title2', 'done': False }})
            
            self.assertEqual(Todo.query.count(), 2)
    
    def test_update_todo(self):
        with self.client:
            """Test 'PATCH' a todo."""
                      
            resp = self.client.patch(
                f"/api/todos/{ self.todo_id }", json={
                    'title' : 'Test-title-patch',
                    'done' : True,
                    })
            
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(
                resp.json,
                { "todo":
                    { 'title': 'Test-title-patch', 'done': True, 'id': self.todo_id }})
            
            self.assertIsInstance(resp.json['todo']['id'], int)
            del resp.json['todo']['id']
            self.assertEqual(Todo.query.count(), 1)
            
    def test_delete_todo(self):
        with self.client:
            """Test 'DELETE' a todo."""
            
            resp = self.client.delete(f"/api/todos/{ self.todo_id }")
            
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(
                resp.json,
                { "message": 'Deleted' })
            self.assertEqual(Todo.query.count(), 0)