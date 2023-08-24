let form = document.querySelector('#form1');
const todo = document.querySelector('li');
let newH3 = document.createElement('h3');
newH3.innerHTML = "<h3>Todos List</h3>";
list.append(newH3);
const li = document.createElement('li');
let newTodo = document.querySelector('#newTodo');

form.addEventListener('submit', function(e) {
	e.preventDefault();
   li.innerText = newTodo.value;
	list.appendChild(li);
   form.reset();
});

const form = document.querySelector('#monkeyform');
form.addEventListener('submit', function(evt) {
	evt.preventDefault(); //stop the http request from being set (stop page reload)
	alert('YOU SUBMITTED THE FORM!!!');
});

// It's VERY WEIRD to do this, but we could prevent links from working!
document.querySelector('a').addEventListener('click', function(e) {
	e.preventDefault();
	console.log('NO GOOGLE FOR YOU!');
});

// We can even prevent default behavior on checkboxes!
document
	.querySelector('input[type="checkbox"]')
	.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('NO CHECKING THAT BOX GUYYY');
	});




const removeButtons = document.querySelectorAll('li button');
const form = document.querySelector('#add-friend');
const input = document.querySelector('#first-name');
const friendList = document.querySelector('#friend-list');

for (let btn of removeButtons) {
	btn.addEventListener('click', function(e) {
		e.target.parentElement.remove();
	});
}

form.addEventListener('submit', function(e) {
	e.preventDefault();
	const newFriend = document.createElement('li');
	const removeBtn = document.createElement('button');
	removeBtn.innerText = 'UnFriend';
	removeBtn.addEventListener('click', function(e) {
		e.target.parentElement.remove();
	});
	newFriend.innerText = input.value;
	newFriend.appendChild(removeBtn);
	friendList.appendChild(newFriend);
	input.value = '';
});

const form = document.querySelector('#add-friend');
const input = document.querySelector('#first-name');
const friendList = document.querySelector('#friend-list');

friendList.addEventListener('click', function(e) {
	if (e.target.tagName === 'BUTTON') {
		e.target.parentElement.remove();
	}
	else if (e.target.tagName === 'LI') {
		e.target.classList.add('best-friend');
		const heart = document.createElement('span');
		heart.innerHTML = '&hearts;';
		e.target.prepend(heart);
	}
});

form.addEventListener('submit', function(e) {
	e.preventDefault();
	const newFriend = document.createElement('li');
	const removeBtn = document.createElement('button');
	removeBtn.innerText = 'UnFriend';

	newFriend.innerText = input.value;
	newFriend.appendChild(removeBtn);
	friendList.appendChild(newFriend);
	input.value = '';
});


const form = document.querySelector("form");
const friendList = document.querySelector("#friend-list");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const newFriendInput = document.querySelector("#first-name");
  const newLi = document.createElement("li");
  const newButton = document.createElement("button");
  newLi.innerText = newFriendInput.value;
  newButton.innerText = "Remove";

  newButton.addEventListener("click", function(event) {
    event.target.parentElement.remove();
  });

  newLi.append(newButton);
  friendList.append(newLi);
  form.reset();
});
makeElement('li', {class:'todo', id:'special'}, 'Wash Dishes');


function makeElement(type, attributes, text) {
   const newEl = document.createElement(type);
   for (let attr of attributes) {
     newEl.setAttribute(attr, attributes[attr])
   }
 }
 
 const h1 = makeElement('hi', {
   class: 'title',
   id: 'blahhh'
 })