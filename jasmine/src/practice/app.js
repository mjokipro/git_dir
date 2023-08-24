document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form1');
     const button = document.getElementById('button1');
    const div = document.getElementById('result-container');
    
    

    function handleEvent(e) {
        e.preventDefault();
        
       
        let newDiv = document.createElement('div');
        
        let width = document.getElementById('width').value;
        let length = document.getElementById('length').value;

        

        let result = calculate(width, length);
        setNewDiv(newDiv, result);

        div.append(newDiv);

        form.reset();
    }
    

    function calculate(wid, len) {
        return wid * len;
    }
    
    function setNewDiv(div, res) {
         div.innerHTML = res;
    }

    function submitForm() {

    }
    
form.addEventListener('submit', handleEvent);
});


