const App = () => (
  <div>
    <Alert>
      <h1>hello</h1>
    <RandomRange min={ 5 } max={ 8 } />
    

    </Alert>
    <TodoList todo={['sit', 'stand']} />
    <Bouncer age={ 6 } />
    <RandomChoice choices={['red', 'green', 'blue']} />
    <Animal name="yodog" species="dog" isCute age={{ age: 4 }}/>
    <Animal name="nosepick" species="cat" />
    <RandomNum />
    <RandomNum />
  </div>
)



ReactDOM.render(<App />, document.getElementById("root"))
