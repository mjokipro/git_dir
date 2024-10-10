function Friend(props) {
  const { name, hobbies } = props;
  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {hobbies.map(h => <li>{h}</li>)}
      </ul>
    </div>
  );
}
