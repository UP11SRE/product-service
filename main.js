const express = require('express');
const app = express();
const productRouter = require('./routes/productRouter');
const sequelize = require('./client/sequelize'); // Correct import for Sequelize
const {connect} = require('./rabbitmq');
require('dotenv').config();


// Middleware
app.use(express.json());

// Routes

// Home Page
app.get('/', (req, res) => {
  res.status(200).send("Welcome to the product service"); // Combine status() and send() calls
});

//to acess static files(product images).
app.use('/uploads', express.static('uploads'));


app.use('/api/products', productRouter);

const port = process.env.PORT;

connect().then(() => {
  console.log('Connected to RabbitMQ');
}).catch((error) => {
  console.error('Failed to connect to RabbitMQ:', error);
});

// Asynchronous function to authenticate Sequelize and start the server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Synchronize models with the database (if needed)
    await sequelize.sync(); // Uncomment this line if you want to synchronize models with the database

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // Exiting the process if there's an error connecting to the database
    process.exit(1);
  }
};

// Call the function to start the server
startServer();
