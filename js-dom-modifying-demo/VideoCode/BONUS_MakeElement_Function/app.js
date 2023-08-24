// makeElement('li', {class:'todo', id:'special'}, 'Wash Dishes');


function makeElement(type, attributes, text) {
  const newEl = document.createElement(type);
  for (let attr in attributes) {
    newEl.setAttribute(attr, attributes[attr])
  }
}

const h1 = makeElement('hi', {
  class: 'title',
  id: 'blahhh'
})