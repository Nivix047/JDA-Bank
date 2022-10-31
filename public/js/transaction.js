let currentBalance = document.querySelector(
  "input[name='current-balance']"
).value;
let currentUser = document.querySelector("input[name='current-user']").value;
const transactionFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const recipient = document.querySelector("#recipient").value.trim();
  const amount = document.querySelector("#transfer-amount").value.trim();

  // Updates balance
  if (amount) {
    const balance = currentBalance - amount;
    const response = await fetch(`api/transactions/${recipient}`, {
      method: "PUT",
      body: JSON.stringify({ balance, amount }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("test", response);
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/");
    } else {
      alert("Failed to transfer.");
    }
  }

  // Creates a debit transaction
  const debit = amount;
  const debitTran = await fetch("api/transactions", {
    method: "POST",
    body: JSON.stringify({ recipient, debit }),
    headers: { "Content-Type": "application/json" },
  });

  if (debitTran.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to transfer.");
  }

  // Creates a credit transaction based on username
  const credit = amount;
  const creditTran = await fetch(`api/transactions/${recipient}`, {
    method: "POST",
    body: JSON.stringify({ recipient: currentUser, credit }),
    headers: { "Content-Type": "application/json" },
  });

  if (creditTran.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace("/");
  } else {
    alert("Failed to transfer.");
  }
};
document
  .querySelector(".transaction-form")
  .addEventListener("submit", transactionFormHandler);
