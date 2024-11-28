document.addEventListener("DOMContentLoaded", () => {
    const mortgageForm = document.getElementById("mortgageForm");
    const resultsEmpty = document.getElementById("results__empty");
    const resultsFilled = document.getElementById("results__filled");
    const monthlyRepayment = document.getElementById("results-data__monthly");
    const totalRepayment = document.getElementById("results-data__total");
  
    const mortgageTypeInputs = document.querySelectorAll("input[name='mortgage_type']");
    const mortgageTypeContainers = document.querySelectorAll(".input-radio");
  
    resultsFilled.style.display = "none"; // Hide the results initially
  
    // Clear all error messages
    function clearErrorMessages() {
      const errorContainers = document.querySelectorAll(".error-container");
      errorContainers.forEach((container) => {
        container.textContent = "";
      });
    }
  
    // Display specific error message
    function displayError(elementId, message) {
      const errorContainer = document.getElementById(elementId);
      if (errorContainer) {
        errorContainer.textContent = message;
      }
    }
  
    // Add active background color
    function updateMortgageTypeBackground() {
      mortgageTypeContainers.forEach((container) => {
        const input = container.querySelector("input[type='radio']");
        if (input.checked) {
          container.style.backgroundColor = "lightyellow";
        } else {
          container.style.backgroundColor = ""; // Reset
        }
      });
    }
  
    // Attach event listeners to mortgage type radio buttons
    mortgageTypeInputs.forEach((input) => {
      input.addEventListener("change", updateMortgageTypeBackground);
    });
  
    mortgageForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent form submission and page reload
      clearErrorMessages(); // Clear previous error messages
  
      // Retrieve inputs
      const amountInput = document.getElementById("amount");
      const termInput = document.getElementById("term");
      const interestRateInput = document.getElementById("interest_rate");
  
      // Parse input values
      const amount = parseFloat(amountInput.value) || 0;
      const term = parseInt(termInput.value) || 0;
      const interestRate = parseFloat(interestRateInput.value) || 0;
      let mortgageType = null;
  
      // Determine selected mortgage type
      mortgageTypeInputs.forEach((input) => {
        if (input.checked) {
          mortgageType = input.value;
        }
      });
  
      // Validation flags
      let formIsValid = true;
  
      // Validate Amount
      if (!amountInput.value.trim()) {
        displayError("error-amount", "This field is required.");
        formIsValid = false;
      } else if (amount <= 0) {
        displayError("error-amount", "Mortgage amount must be greater than 0.");
        formIsValid = false;
      }
  
      // Validate Term
      if (!termInput.value.trim()) {
        displayError("error-term", "This field is required.");
        formIsValid = false;
      } else if (term <= 0) {
        displayError("error-term", "Mortgage term must be greater than 0.");
        formIsValid = false;
      }
  
      // Validate Interest Rate
      if (!interestRateInput.value.trim()) {
        displayError("error-interest-rate", "This field is required.");
        formIsValid = false;
      } else if (interestRate < 0) {
        displayError("error-interest-rate", "Interest rate cannot be negative.");
        formIsValid = false;
      }
  
      // Validate Mortgage Type
      if (!mortgageType) {
        displayError("error-mortgage-type", "This field is required.");
        formIsValid = false;
      }
  
      // Stop further processing if the form is invalid
      if (!formIsValid) return;
  
      // Perform calculations (only if the form is valid)
      let monthlyPayment = 0;
      let totalRepaymentAmount = 0;
  
      if (mortgageType === "repayment") {
        // Repayment Mortgage Calculation
        const monthlyRate = interestRate / 100 / 12;
        const totalMonths = term * 12;
  
        if (monthlyRate > 0) {
          monthlyPayment =
            (amount * monthlyRate) /
            (1 - Math.pow(1 + monthlyRate, -totalMonths));
        } else {
          monthlyPayment = amount / totalMonths;
        }
  
        totalRepaymentAmount = monthlyPayment * totalMonths;
      } else if (mortgageType === "interest_only") {
        // Interest-Only Mortgage Calculation
        const annualInterest = (amount * interestRate) / 100;
        monthlyPayment = annualInterest / 12;
        totalRepaymentAmount = annualInterest * term + amount;
      }
  
      // Ensure the results are valid numbers
      monthlyPayment = isNaN(monthlyPayment) ? 0 : monthlyPayment;
      totalRepaymentAmount = isNaN(totalRepaymentAmount) ? 0 : totalRepaymentAmount;
  
      // Update the results
      monthlyRepayment.textContent = `£${monthlyPayment.toFixed(2)}`;
      totalRepayment.textContent = `£${totalRepaymentAmount.toFixed(2)}`;
  
      // Show results and hide the empty section
      resultsEmpty.style.display = "none";
      resultsFilled.style.display = "block";
    });
  
    // Clear results when the form is reset
    mortgageForm.addEventListener("reset", () => {
      resultsEmpty.style.display = "block";
      resultsFilled.style.display = "none";
      monthlyRepayment.textContent = "";
      totalRepayment.textContent = "";
  
      // Clear all error messages
      clearErrorMessages();
  
      // Reset mortgage type background
      mortgageTypeContainers.forEach((container) => {
        container.style.backgroundColor = "";
      });
    });
  });
  