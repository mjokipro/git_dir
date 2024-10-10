
// const greeter = {
// 	msg          : 'I like chickenz',
// 	sayHi        : () => {
// 		alert(this.msg);
// 	},
// 	// waitAndGreet : function(delay) {
// 	// 	setTimeout(
// 	// 		function() {
// 	// 			alert(this.msg);
// 	// 		}.bind(this),
// 	// 		delay
// 	// 	);
// 	// }
// 	waitAndGreet : function(delay) {
// 		setTimeout(() => {
// 			alert(this.msg);
// 		}, delay);
// 	}
// };
 function popUp(msg) {
    alert("Secret message is " + msg);
  }

  const get = document.getElementById.bind(document);

  get('a').addEventListener("click", popUp.bind(null, "Apple"));
  get('b').addEventListener("click", popUp.bind(null, "Berry"));
  get('c').addEventListener("click", popUp.bind(null, "Cherry"));