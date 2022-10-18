let currentBalance = document.querySelector(
  "input[name='current-balance']"
).value;
const transactionFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const recipient = document.querySelector("#recipient").value.trim();
  const amount = document.querySelector("#transfer-amount").value.trim();

  if (amount) {
    const balance = currentBalance - amount;
    const response = await fetch("api/transactions", {
      method: "PUT",
      body: JSON.stringify({ balance }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      // document.location.replace("/");
    } else {
      alert("Failed to transfer.");
    }
  }

  if (recipient && amount) {
    // Send a POST request to the API endpoint
    const response = await fetch(`api/transactions/${recipient}`, {
      method: "PUT",
      body: JSON.stringify({ amount }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/");
    } else {
      alert("Failed to transfer.");
    }
  }

  // Sends transaction
  const response = await fetch("api/transactions", {
    method: "POST",
    body: JSON.stringify({ recipient, amount }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace("/");
  } else {
    alert("Failed to transfer.");
  }
};
document
  .querySelector(".transaction-form")
  .addEventListener("submit", transactionFormHandler);
