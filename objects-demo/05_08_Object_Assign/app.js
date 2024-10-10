const gasCar = {
	hasGasTank : true,
	numWheels  : 4
};

const pickUp = {
	hasTruckBed : true,
	isMuddy     : true
};

const electricCar = {
	hasBattery : true,
	numWheels  : 4
};

const bike = {
	numWheels : 2
};

// Object.assign(target,  source)

//Copy properties from gasCar into pickUp
Object.assign(pickUp, gasCar);

//create a copy of pickUp
const newPickup = Object.assign({}, pickUp);

//create a new object containing properties from gasCar, pickUp, and electricCar
const hybridTruck = Object.assign({}, gasCar, pickUp, electricCar);

// The order matters when you have conflicting properties!
const eBike = Object.assign({}, electricCar, bike);

//Object.assign DOES NOT PERFORM A DEEP CLONEE
const pam = {
	firstName : 'Pam',
	city      : 'Santiago',
	vehicles  : [ 'bike', 'sedan' ]
};

const pamClone = Object.assign({}, pam);

pam === pamClone; //The top-level object is cloned

//But nested objects and arrays still share the same reference
pam.vehicles === pamClone.vehicles;
