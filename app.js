document.addEventListener("DOMContentLoaded", () => {
  const mortgageForm = document.getElementById("mortgageForm");
  const resultsEmpty = document.getElementById("results__empty");
  const resultsFilled = document.getElementById("results__filled");
  const monthlyRepayment = document.getElementById("results-data__monthly");
  const totalRepayment = document.getElementById("results-data__total");

  resultsFilled.style.display = "none"; // Hide the results initially

  mortgageForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission and page reload

    const amount = parseFloat(document.getElementById("amount").value);
    const term = parseInt(document.getElementById("term").value);
    const interestRate = parseFloat(
      document.getElementById("interest_rate").value
    );
    const mortgageType = document.querySelector(
      'input[name="mortgage_type"]:checked'
    ).value;

    if (isNaN(amount) || isNaN(term) || isNaN(interestRate)) {
      alert("Please provide valid inputs.");
      return;
    }

    let monthlyPayment, totalRepaymentAmount;

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
    } else if (mortgageType === "interes_only") {
      // Interest-Only Mortgage Calculation
      const annualInterest = (amount * interestRate) / 100;
      monthlyPayment = annualInterest / 12;
      totalRepaymentAmount = annualInterest * term + amount;
    }

    document.addEventListener("DOMContentLoaded", () => {
        const radioButtons = document.querySelectorAll(".input-radio input");
      
        radioButtons.forEach((radio) => {
          radio.addEventListener("click", () => {
            // Reset styles for all containers
            document.querySelectorAll(".input-radio").forEach((inputContainer) => {
              inputContainer.style.backgroundColor = ""; // Reset background
            //   inputContainer.style.border = "1px solid var(--slate-500)"; // Reset border
            });
      
            // Highlight the selected container
            const parentContainer = radio.closest(".input-radio");
            parentContainer.style.backgroundColor = "hsl(59, 89%, 89%)";
            parentContainer.style.border = "1px solid var(--lime)";
      
            // Ensure the radio button is selected
            radio.checked = true;
          });
        });
      });
      

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
  });
});
