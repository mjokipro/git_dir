const Person = ({username, age, hobbies}) => {
    const ano = age >= 18 ? "vote" : "study"

    return (
        <div>
            <p>Learn some info</p>
            <p>{username}</p>
            <p>{age}</p>
            <p>{ano}</p>
            <ul>{hobbies.map(v => <li>{v}</li>)}</ul>
        </div>
    )
}