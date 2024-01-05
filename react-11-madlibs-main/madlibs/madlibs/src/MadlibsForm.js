import React from "react";

const MadlibsForm = ({ handleSubmit, handleChange }) => {
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="noun1"
				placeholder="noun 1"
				onChange={handleChange}
			/>
			<input
				type="text"
				name="noun2"
				placeholder="noun 2"
				onChange={handleChange}
			/>
			<input
				type="text"
				name="adjective"
				placeholder="Adjective"
				onChange={handleChange}
			/>
			<input
				type="text"
				name="color"
				placeholder="color"
				onChange={handleChange}
			/>
			<button>Get Story</button>
		</form>
	);
};

export default MadlibsForm;
