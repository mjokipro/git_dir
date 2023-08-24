document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form1');

    if (form) {
        setupIntialValues();
        form.addEventListener('submit', (e) => { 
            e.preventDefault();
            updateVals();
        });
    }

});

// call this function to pull in vals from text box
function getCurrentVals() {
    // return obj to getCurrentVals
    return {
        // parse input to int val; store in obj prop 'income'
        income: +(document.getElementById('enter-income-input').value),
    }
}

// create and init vars for input data
function setupIntialValues() {

    // create obj w/ var and init to val
    const vals = { income: 30000 };
    // create var for input element
    const input = document.getElementById('enter-income-input');
    // init input.value to income value in obj
    input.value = vals.income;
    // capture, manip, and output data
    updateVals();
}


function updateVals() {
    const currentVals = getCurrentVals();
    updateDiv(calculateTaxes(currentVals));
}

function calculateTaxes(income) {

    if (income > 30000) {
        return income * 0.25;
    } else {
        return income * 0.15;
    }
}

function updateDiv(val) {
    const newDiv = document.getElementById('result-container');
    newDiv.innerText = val;
}

// function removeDupes(values) {
//     const arr = [...new Set(values)];
//     if (typeof values === 'string') return arr.join('')
//     return arr;
// }