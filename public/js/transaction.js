const transactionFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const recipient = document.querySelector("#recipient").value.trim();
  const amount = document.querySelector("#transfer-amount").value.trim();

  if (recipient && amount) {
    // Send a POST request to the API endpoint
    const response = await fetch("api/transactions", {
      method: "POST",
      body: JSON.stringify({ recipient, amount }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

document
  .querySelector(".transaction-form")
  .addEventListener("submit", transactionFormHandler);
