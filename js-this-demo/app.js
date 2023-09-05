const greeter = {
	msg          : 'I like chickenz',
	sayHi        : () => {
		alert(this.msg);
	},
	// waitAndGreet : function(delay) {
	// 	setTimeout(
	// 		function() {
	// 			alert(this.msg);
	// 		}.bind(this),
	// 		delay
	// 	);
	// }
	waitAndGreet : function(delay) {
		setTimeout(() => {
			alert(this.msg);
		}, delay);
	}
};
