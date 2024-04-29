const { DataTypes } = require('sequelize');
const sequelize = require('../client/sequelize');

const product = sequelize.define('product_details', {
  productId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: { // Modified from Imageurl to imageUrl for consistency and camelCase convention
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER, // Changed from INT to INTEGER for data type consistency
    allowNull: false,
  },
  quantity: { // Corrected from quanity to quantity
    type: DataTypes.INTEGER, // Changed from INT to INTEGER for data type consistency
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

module.exports = product;
