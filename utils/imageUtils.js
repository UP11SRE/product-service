const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

// Create the uploads directory if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the uploadDir variable as the destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpeg");
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Middleware for image compression
const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  try {
    // Read the uploaded image from disk
    fs.readFile(req.file.path, async (err, data) => {
      if (err) {
        return next(err);
      }
      // Resize and compress the image buffer
      const compressedBuffer = await sharp(data)
        .resize({ width: 200, height: 200 })
        .toBuffer();
      
      // Replace the original buffer with the compressed buffer
      req.file.buffer = compressedBuffer;
      
      // Continue to the next middleware
      next();
    });
  } catch (error) {
    return next(error);
  }
};


module.exports = { upload, compressImage };
