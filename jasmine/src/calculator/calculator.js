window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const initVals = { amount: 30000, years: 3, rate: 1.33 };

  const newAmt = document.getElementById('loan-amount');
  newAmt.value = initVals.amount;

  const newYears = document.getElementById('loan-years');
  newYears.value = initVals.years;

  const newRate = document.getElementById('loan-rate');
  newRate.value = initVals.rate;
  
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currVals = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currVals));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12;
  const n = Math.floor(values.years * 12);

  return ((monthlyRate * values.amount) /
    (1 - Math.pow((1 + monthlyRate), -n))).toFixed(2);
}


// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let mPay = document.getElementById('monthly-payment');
  mPay.innerText = monthly;
}
