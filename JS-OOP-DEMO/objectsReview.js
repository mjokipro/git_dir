const color = 'teal';

const obj = {};
obj.color = '#3723FF';
obj[color] = '#3723FF';
obj[1 + 4 - 2 * 8] = '#3723FF';

for (let [ key, value ] of Object.entries(obj)) {
	console.log(key, value);
}

