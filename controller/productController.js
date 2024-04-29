const productService = require('../service/productService');
const intercomAuth = require('../authMiddle');
const { compressImage } = require('../utils/imageUtils');



module.exports = {
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const productId = req.query.productId;
      const product = await productService.getProductById(productId);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async addProduct(req, res) {
    try {
      const { name, brand, description, category, price, quantity } = req.body;

    const role = req.user.payload.role;
      
    if(role == admin){
      // Check if image file is present in the request
      if (!req.file) {
        throw new Error('Image file is required');
      }
     
      console.log(req.file);
      // Construct the image link
      let imageUrl = req.file.path; // Multer stores the image path in req.file.path
      if (!imageUrl) {
        throw new Error('Image upload failed');
      }
      
      const host = req.protocol + '://' + req.get('host');
      const imageLink = host + '/' + imageUrl.replace('uploads/', ''); // Remove 'uploads/' from the image path
      console.log("Image link:", imageLink);
  
      // Add the product with the constructed image link
      await productService.addProduct(name, brand, description, category, price, quantity, imageLink);
      res.json({ message: 'Product added successfully' });
    } else{
      res.status(403).json({ message: "Admin Routes only" });
    }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  
  },  

  async updateProduct(req, res) {
    try {
        const { productId } = req.params;
        const updateFields = req.body;

    const role = req.user.payload.role;

    if(role == admin){

        // Check if file was uploaded
        if(req.file){
            console.log("file", req.file.path);
            const imageUrl = req.file.path; // Assuming Multer saves the file path in req.file.path
            

            
            // Construct full image link
            const host = req.protocol + '://' + req.get('host');
            const imageLink = host + '/' + imageUrl;
            console.log("Image link:", imageLink);

            // Update updateFields with compressed image URL
            updateFields.imageUrl = imageLink;
        }

        // Update product with the updated fields
        
        console.log("checking", updateFields);

        await productService.updateProduct(productId, updateFields);

        res.json({ message: 'Product updated successfully' });
      }else{
        res.status(403).json({ message: "Admin Routes only" });
      }
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
},

  async deleteProduct(req, res) {
    try {
      const productId = req.body.productId;
      await productService.deleteProduct(productId);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
