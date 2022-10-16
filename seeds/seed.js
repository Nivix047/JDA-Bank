const sequelize = require("../config/connection");
const { User, Transaction } = require("../models");

const userData = require("./userData.json");
const transactionData = require("./transactionData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const transaction = await Transaction.bulkCreate(transactionData, {
    individualHooks: true,
    returning: true,
  });

  // for (const transaction of transactionData) {
  //   await Transaction.create({
  //     ...transaction,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
