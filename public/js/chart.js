fetch("/api/transactions")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    tranChart(data);
  });

let debitSum = 0;
let creditSum = 0;

const tranChart = function (transactions) {
  console.log("----transactions----");
  console.log(transactions);
  console.log("----all credits----");

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].debit !== null) {
      let debit = transactions[i].debit;
      debitSum += parseInt(debit);
    }
    console.log("debitSum", debitSum);
  }

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].credit !== null) {
      let credit = transactions[i].credit;
      creditSum += parseInt(credit);
    }
    console.log("creditSum", creditSum);
  }

  const transactionData = [creditSum, debitSum];
  console.log("transactionData", creditSum, debitSum);

  const labels = ["Transactions"];
  const data = {
    labels: ["Credit", "Debit"],
    datasets: [
      {
        label: "My First Dataset",
        data: transactionData,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
    options: {},
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
};
