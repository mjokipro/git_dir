// const teaOrder = {
// 	variety     : 'oolong',
// 	teaName     : 'winter sprout',
// 	origin      : 'taiwan',
// 	price       : 12.99,
// 	hasCaffeine : true,
// 	quantity    : 3
// };

// const price = teaOrder.price;
// const quantity = teaOrder.quantity;
// const teaName = teaOrder.teaName;

// const { price, quantity, ...others } = teaOrder;

// const { brewTemp: temp = 175 } = teaOrder;

// const { teaName: tea } = teaOrder;

// function checkout(tea) {
// 	const { quantity = 1, price } = tea;
// 	return quantity * price;
// }

// checkout(teaOrder);

// const order1 = {
// 	variety     : 'green',
// 	teaName     : 'silver needle',
// 	origin      : 'taiwan',
// 	price       : 12.99,
// 	hasCaffeine : true
// };

// const students = [
// 	{ name: 'Drake', gpa: 4.6 },
// 	{ name: 'Henrietta', gpa: 4.4 },
// 	{ name: 'Tung', gpa: 4.0 },
// 	{ name: 'Harry', gpa: 3.8 },
// 	{ name: 'Ant', gpa: 3.2 }
// ];

// const [ topStudent, secondBest, ,fourth ] = students;
// const [ first, ...losers ] = students;

const order2 = {
	variety     : 'green',
	teaName     : 'silver needle',
	origin      : 'taiwan',
	price       : 12.99,
	hasCaffeine : true
};

function getTotal({ quantity: qty = 1, price }) {
	return qty * price;
}

const longJumpResults = [ 'Tammy', 'Jessica', 'Violet' ];
const swimMeetResults = [ 'Japan', 'France', 'Chile' ];

function awardMedals([ gold, silver, bronze ]) {
	return {
		gold,
		silver,
		bronze
	};
}

const metadata = {
	title        : 'Scratchpad',
	translations : [
		{
			locale            : 'de',
			localization_tags : [],
			last_edit         : '2014-04-14T08:43:37',
			url               : '/de/docs/Tools/Scratchpad',
			title             : 'JavaScript-Umgebung'
		}
	],
	url          : '/en-US/docs/Tools/Scratchpad'
};

const movie = {
	Title      : 'Amadeus',
	Year       : '1984',
	Rated      : {
		rating   : 'R',
		advisory : 'Rated R for brief nudity'
	},
	Released   : '19 Sep 1984',
	Runtime    : '160 min',
	Genres     : [ 'Biography', 'Drama', 'History', 'Music' ],
	Director   : 'Milos Forman',
	Writer     :
		'Peter Shaffer (original stage play), Peter Shaffer (original screenplay)',
	Actors     :
		'F. Murray Abraham, Tom Hulce, Elizabeth Berridge, Roy Dotrice',
	Plot       :
		"Antonio Salieri believes that Wolfgang Amadeus Mozart's music is divine and miraculous. He wishes he was himself as good a musician as Mozart so that he can praise the Lord through composing. He began his career as a devout man who believes his success and talent as a composer are God's rewards for his piety. He's also content as the respected, financially well-off, court composer of Austrian Emperor Joseph II. But he's shocked to learn that Mozart is such a vulgar creature, and can't understand why God favored Mozart to be his instrument. Salieri's envy has made him an enemy of God whose greatness was evident in Mozart. He is ready to take revenge against God and Mozart for his own musical mediocrity.",
	Language   : 'English, Italian, Latin, German',
	Versions   : [
		{ version: 'Original Release', runtime: 161 },
		{ version: "Director's Cut", runtime: 180 }
	],
	Country    : 'USA, France, Czechoslovakia, Italy',
	Awards     : 'Won 8 Oscars. Another 33 wins & 14 nominations.',
	Poster     :
		'https://m.media-amazon.com/images/M/MV5BNWJlNzUzNGMtYTAwMS00ZjI2LWFmNWQtODcxNWUxODA5YmU1XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
	Ratings    : [
		{ Source: 'Internet Movie Database', Value: '8.3/10' },
		{ Source: 'Rotten Tomatoes', Value: '93%' },
		{ Source: 'Metacritic', Value: '88/100' }
	],
	imdbVotes  : '346,056',
	imdbID     : 'tt0086879',
	Type       : 'movie',
	DVD        : '16 Dec 1997',
	BoxOffice  : 'N/A',
	Production : 'Warner Bros. Pictures',
	Website    : 'N/A',
	Response   : 'True'
};

// const { Rated } = movie;
// const { rating, advisory } = Rated;
const { Rated: { rating, advisory: note } } = movie;
const {
	Ratings  : [
		{ Value: imdbRating },
		{ Value: rtRating },
		{ Value: metaRating }
	],
	Versions : [
		{ runtime: originalRunTime },
		{ runtime: directorsCutRunTime }
	]
} = movie;

// **************************************
// SWAPPING VARIABLES USING DESTRUCTURING
// **************************************

let delicious = 'Mayonnaise'; //THIS IS WRONG! MAYO IS NASTY!
let disgusting = 'Whipped Cream';

// let temp = delicious;
// delicious = disgusting;
// disgusting = temp;

// let both = [ delicious, disgusting ];
// [ disgusting, delicious ] = both;

// Swaps the variables in one line!
[ disgusting, delicious ] = [ delicious, disgusting ];
