const { Model, DataTypes, DATEONLY, DECIMAL } = require("sequelize");
const sequelize = require("../config/connection");

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // to track credits
    recipient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // amount: {
    //   type: DataTypes.DECIMAL,
    //   allowNull: false,
    // },
    credit: {
      type: DataTypes.DECIMAL,
      // allowNull: false,
    },
    debit: {
      type: DataTypes.DECIMAL,
      // allowNull: false,
    },
    // user_id: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
  },
  // user_balance: {
  //   type: DataTypes.DECIMAL,
  //   references: {
  //     model: 'user',
  //     key: 'balance',
  //   },
  // },
  // },
  {
    sequelize,
    timestamps: false,
    // freezeTableName: true,
    // underscored: true,
    // modelName: "transaction",
  }
);

module.exports = Transaction;
