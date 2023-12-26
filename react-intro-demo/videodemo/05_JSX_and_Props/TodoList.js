const TodoList = (props) => {
  const todos = [
    <li>Walk</li>,
    <li>Run</li>,
    <li>Sleep</li>
  ]

  return (
    <div>
      <h4>Todo List</h4>
      <ul>
      { todos }
      { props.todo.map(v => 
          (
            <div>
              <li> 
                <input type="checkbox" />{ v }
              </li>
            </div>
          ) 
        )}
      </ul>
    </div>
  )
}