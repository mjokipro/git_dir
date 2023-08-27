const palette = [ 'lavender berry', 'sunflower yellow', 'orchid orange' ];

// const paletteCopy = palette.slice();
const paletteCopy = [ 'sky blue', ...palette, 'grass green' ];

const greenTeas = [ 'snow jasmine', 'fragrant leaf' ];
const oolongTeas = [ 'honey orchid', 'winter sprout' ];
const herbalTeas = [ 'african solstice', 'marshmallowroot' ];
const coffees = [ 'guatemala red cat', 'snow leopard blend' ];

const allTeas = [ ...greenTeas, ...oolongTeas, ...herbalTeas ];

const withCaffeine = [ ...greenTeas, ...oolongTeas, ...coffees, 'Earl Grey' ];

const vowels = 'aeiou';
const vowelArr = [ ...vowels, 'sometimes y' ];
