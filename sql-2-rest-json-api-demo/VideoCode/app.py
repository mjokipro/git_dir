from flask import Flask, request, jsonify, render_template
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Todo

app = Flask(__name__)
app.config.update(TEMPLATES_AUTO_RELOAD=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///todos_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['FLASK_ENV'] = 'development'
debug = DebugToolbarExtension(app)

connect_db(app)


@app.route('/')
def index_page():
    """Renders html template that includes some JS - NOT PART OF JSON API!"""
    todos = Todo.query.all()
    return render_template('index.html', todos=todos)

# *****************************
# RESTFUL TODOS JSON API
# *****************************

@app.route('/api/todos')
def list_todos():
    """Show a list of all todos."""
    all_todos = [todo.serialize() for todo in Todo.query.all()]
    
    return jsonify(todos=all_todos)

@app.route('/api/todos/<int:id>')
def get_todo(id):
    """'GET' and show info for a todo."""
    todo = Todo.query.get_or_404(id)
    
    return jsonify(todo=todo.serialize())

@app.route('/api/todos', methods=['POST'])
def add_todo():
    """'POST' and show info for a todo."""
    new_todo = Todo(title=request.json["title"])
    db.session.add(new_todo)
    db.session.commit()
    
    return (jsonify(todo=new_todo.serialize()), 201)
    
@app.route('/api/todos/<int:id>', methods=["PATCH"])
def update_todo(id):
    """'PATCH' and show info for a todo."""
    todo = Todo.query.get_or_404(id)
    
    todo.title = request.json.get('title', todo.title)
    todo.done = request.json.get('done', todo.done)
    db.session.commit()
    # db.session.query(Todo).filter_by(id=id).update(request.json)
    
    return jsonify(todo=todo.serialize())

@app.route('/api/todos/<int:id>', methods=["DELETE"])
def delete_todo(id):
    """'PATCH' and show info for a todo."""
    todo = Todo.query.get_or_404(id)
    
    db.session.delete(todo)
    db.session.commit()
    # db.session.query(Todo).filter_by(id=id).update(request.json)
    
    return jsonify(message="Deleted")

if __name__ == '__main__':
    app.run(debug=True)