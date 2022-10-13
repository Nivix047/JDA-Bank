const { Model, DataTypes, Transaction } = require("sequelize");
const sequelize = require("../config/connection");

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
