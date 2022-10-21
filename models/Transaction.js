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

    credit: {
      type: DataTypes.DECIMAL,
      // allowNull: false,
    },
    debit: {
      type: DataTypes.DECIMAL,
      // allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    // freezeTableName: true,
    // underscored: true,
    // modelName: "transaction",
  }
);

module.exports = Transaction;
