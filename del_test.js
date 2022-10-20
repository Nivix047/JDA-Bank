// Running balance logic
const transactions = [
  {
    credit: null,
    debit: 1,
    user_id: 1,
    transaction_date: "2022-10-19",
  },
  {
    credit: 2,
    debit: null,
    user_id: 1,
    transaction_date: "2022-10-10",
  },
  {
    credit: 5000,
    debit: null,
    user_id: 1,
    transaction_date: "2022-10-01",
  },
];

// end bal  = 10
// 8
// 9

const result = [];

const sample = {
  current_bal: 123,
  date: "2022-10-10",
};

transactions.reduce((runningBalance, singleTransaction) => {
  console.log(runningBalance);
  if (singleTransaction.debit !== null) {
    result.push({
      date: singleTransaction.transaction_date,
      current_balance: runningBalance + singleTransaction.debit,
    });
    return runningBalance + singleTransaction.debit;
  } else {
    result.push({
      date: singleTransaction.transaction_date,
      current_balance: runningBalance - singleTransaction.credit,
    });
    return runningBalance - singleTransaction.credit;
  }
}, 10000);

console.log(result);

// test

const nums = [1, 2, 3];

const answer = nums.reduce((pre, cur) => pre + cur);
console.log(answer);
