const Bouncer = (props) => {
    let reply = props.age > 18 ? "go in" : "too young"
    return (
        <div>
            <p>
                <b>Bouncer: How old are you? </b>
            </p>
            <p>
            { props.age }
            </p>
            <p>
                Bouncer: { reply }
            </p>
        </div>
    )
}