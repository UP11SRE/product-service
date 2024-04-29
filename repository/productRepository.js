const product = require('../entity/productEntity');

module.exports = {
  async getAllProducts() {
    return await product.findAll();
  },

  async getProductById(productId) {
    return await product.findByPk(productId);
  },

  async addProduct(name, brand, description, category, price, quantity, imageLink) {
    return await product.create({ name, brand, description, category, price, quantity, imageUrl: imageLink });
  },

  async productQuantityUpdate(productId, quantity) {
    const details =  await product.findByPk(productId);

    const prevQuant = details.quantity;

    details.quantity = prev - quantity;

    await details.save();

    return;
  },


  async orderCancelation(productId, amount) {
    const details =  await product.findByPk(productId);

    const prevQuant = details.price;

    const newQaunt = amount / prevQuant;

    details.quantity = newQaunt;

    await details.save();

    return;
  },

  async updateProduct(productId, updateFields) {
    try {
        const details = await product.findByPk(productId);
        if (!details) {
            throw new Error('Product not found');
        }
          
        console.log("checking the update fields", updateFields);
        // Update only the fields provided in updateFields
        const standardUpdateFields = { ...updateFields };

        // Update only the fields provided in updateFields
        for (const key in standardUpdateFields) {
            if (standardUpdateFields.hasOwnProperty(key)) {
                details[key] = standardUpdateFields[key];
            }
        }

        // Save the updated product details to the database
       const res =  await details.save();
        return res;
    } catch (error) {
        console.log("error1", error);
        throw error;
    }
},

  async deleteProduct(productId) {
    const details = await product.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    await details.destroy();
  }
};
