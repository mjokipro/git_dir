const MovieList = () => {
	return (
		<ul>
			<li>Amadeus</li>
			<li>Alien</li>
			<li>Arrival</li>
		</ul>
	);
};

const App = () => {
	return (
		<div>
			<h1>App Component!</h1>
			<MovieList />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));

