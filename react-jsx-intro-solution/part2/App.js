function App() {
  return (
    <div>
      <Tweet
        name="Matt Lane"
        username="mmmaaatttttt"
        date={new Date().toDateString()}
        message="This app will disrupt everything!!"
      />
      <Tweet
        name="Elie Schoppik"
        username="eschoppik"
        date={new Date().toDateString()}
        message="#Ilovehashtags"
      />
      <Tweet
        name="Tim Garcia"
        username="TimGarcia0"
        date={new Date().toDateString()}
        message="Follow me on Twitter!"
      />
    </div>
  );
}
