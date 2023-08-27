function sum(...nums) {
	return nums.reduce((sum, n) => sum + n);
}

const sumAll = (...values) => {
	if (!values.length) return undefined;
	return values.reduce((sum, n) => sum + n);
};

function makeFamily(parent1, parent2, ...kids) {
	return {
		parents  : [ parent1, parent2 ],
		children : kids.length ? kids : 0
	};
}
const filterByType = (type, ...vals) => {
	return vals.filter((v) => typeof v === type);
};
