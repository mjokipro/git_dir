'use strict'; //THIS BEHAVES DIFFERENTLY!
const cat = {
	name  : 'Blue',
	breed : 'Scottish Fold',
	dance : function(dance) {
		console.log('THIS IS:', this);
		console.log(`Meow, I am a ${this.breed} and I like to ${dance}`);
	}
};

class Cat {
	constructor(name, breed) {
		this.name = name;
		this.breed = breed;
	}
	dance(danceType) {
		console.log('THIS IS:', this);
		console.log(`Meow, I am a ${this.breed} and I like to ${danceType}`);
	}
}
cat.dance('salsa');
const bluesDance = cat.dance;
bluesDance('salsa');

// 'use strict';

// function _instanceof(left, right) {
// 	if (
// 		right != null &&
// 		typeof Symbol !== 'undefined' &&
// 		right[Symbol.hasInstance]
// 	) {
// 		return !!right[Symbol.hasInstance](left);
// 	}
// 	else {
// 		return left instanceof right;
// 	}
// }

// function _classCallCheck(instance, Constructor) {
// 	if (!_instanceof(instance, Constructor)) {
// 		throw new TypeError('Cannot call a class as a function');
// 	}
// }

// function _defineProperties(target, props) {
// 	for (var i = 0; i < props.length; i++) {
// 		var descriptor = props[i];
// 		descriptor.enumerable = descriptor.enumerable || false;
// 		descriptor.configurable = true;
// 		if ('value' in descriptor) descriptor.writable = true;
// 		Object.defineProperty(target, descriptor.key, descriptor);
// 	}
// }

// function _createClass(Constructor, protoProps, staticProps) {
// 	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
// 	if (staticProps) _defineProperties(Constructor, staticProps);
// 	return Constructor;
// }

// var Cat =
// 	/*#__PURE__*/
// 	(function() {
// 		function Cat(name, breed) {
// 			_classCallCheck(this, Cat);

// 			this.name = name;
// 			this.breed = breed;
// 		}

// 		_createClass(Cat, [
// 			{
// 				key   : 'dance',
// 				value : function dance(danceType) {
// 					console.log('THIS IS:', this);
// 					console.log(
// 						'Meow, I am a '
// 							.concat(this.breed, ' and I like to ')
// 							.concat(danceType)
// 					);
// 				}
// 			}
// 		]);

// 		return Cat;
// 	})();

// const rocket = new Cat('rocket', 'tabby');
// rocket.dance('tango');
// const rocketDance = rocket.dance;
// rocketDance('tango');
