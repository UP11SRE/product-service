const productRepository = require('../repository/productRepository');

module.exports = {
  async getAllProducts() {
    return await productRepository.getAllProducts();
  },

  async getProductById(productId) {
    return await productRepository.getProductById(productId);
  },

  async addProduct(productName, brand, description, category, price, quantity, imageUrl) {
    console.log("checking the fields", productName, brand, description, category, price, quantity, imageUrl);
    return await productRepository.addProduct(productName, brand, description, category, price, quantity, imageUrl);
  },

  async productQuantityUpdate(data){
    const response = await productRepository.productQuantityUpdate(data.productId, data.quantity);
    console.log(response);

  },

  async orderCancelation(data){
    const response = await productRepository.orderCancelation(data.productId, data.amount);
    console.log(response);
  },

  async updateProduct(productId, updateFields) {
    return productRepository.updateProduct(productId, updateFields);
    
  },

  async deleteProduct(productId) {
    return await productRepository.deleteProduct(productId);
  }
};
