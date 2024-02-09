const tea = {
	type   : 'oolong',
	name   : 'winter sprout',
	origin : 'taiwan'
};

const teaData = {
	steepTime : '30s',
	brewTemp  : 175,
	origin    : 'japan'
};

// const tea2 = { ...tea };

const teaTin = { ...tea, price: 22.99 };

// const newTea = { ...tea, name: 'golden frost' };
const newTea = { name: 'golden frost', ...tea };

const fullTea = { ...tea, ...teaData };

const colors = [ 'red', 'orange', 'blue' ];
const dummyObj = { ...colors, ...'CAT' };
