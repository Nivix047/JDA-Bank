const User = require("./User");
const Account = require("./Account");
const Transaction = require("./Transaction");

User.hasOne(Account, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Transaction, {
  foreignKey: "transaction_id",
  onDelete: "CASCADE",
});

Account.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Account.hasMany(Transaction, {
  foreignKey: "transaction_id",
  onDelete: "CASCADE",
});

// Good for the project, in real world application no need for onDelete CASCADE
Transaction.belongsTo(Account, {
  foreignKey: "account_id",
  onDelete: "CASCADE",
});

Transaction.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { User, Account, Transaction };
