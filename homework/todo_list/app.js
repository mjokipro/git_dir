document.addEventListener("DOMContentLoaded", function() {
   let form = document.getElementById('form1');
   let listItems = document.getElementById('todo-list')
   
   form.addEventListener('submit', function(e) {
      e.preventDefault();

      let removeBtn = document.createElement('button');
      removeBtn.innerText = 'Remove';

      let newTodo = document.createElement('li');
      newTodo.innerText = document.getElementById('todo').value;
      newTodo.appendChild(removeBtn);
      listItems.appendChild(newTodo);

      form.reset();
   });

      listItems.addEventListener("click", function(e) {
         const targetTag = e.target.tagName.toLowerCase();
         if(targetTag === 'li') {
            e.target.style.textDecoration = 'line-through';
         } else if(targetTag === 'button') {
            e.target.parentNode.remove();
         }
         
      });
});

