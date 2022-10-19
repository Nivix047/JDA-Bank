const Chart = require("chart.js")

const ctx = document.getElementById("credit_debit");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["${Transactions.transaction_date}"],
    datasets: [
      {
        label: "Credit",
        backgroundColor: "#3E95CD",
        data: ["${Transactions.credit}"],
      },
      {
        label: "Debit",
        backgroundColor: "#8E5EA2",
        data: ["${Transactions.debit}"],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Credits and Debits",
    },
  },
});
