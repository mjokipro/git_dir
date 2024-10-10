import React from "react";
import PropTypes from 'prop-types'

const Person = (props) => {

    return (
        <div>
            <p>Name is: {props.name}</p>
            <p>Age is: {props.age}</p>
        </div>
    )
}

Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number
};

export default Person;