import React, { useState } from "react";
import MadlibsForm from "./MadlibsForm";
import MadlibsResult from "./MadlibsResult";
const Madlibs = () => {
	const INITIAL_STATE = { noun1: "", noun2: "", adjective: "", color: "" };
	const [inputs, setInputs] = useState(INITIAL_STATE);

	const [submitted, setSubmitted] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
	};
	const handleChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	return submitted ? (
		<MadlibsResult {...inputs} />
	) : (
		<MadlibsForm handleChange={handleChange} handleSubmit={handleSubmit} />
	);
};
export default Madlibs;
