const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "transaction",
  }
);

module.exports = Transaction;
