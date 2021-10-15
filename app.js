const express = require('express')
const colors = require('colors')
require('dotenv').config({ path: './api/config/config.env' })

const orderModel = require('./api/models/Order')

const connectDB = require('./api/config/db')

const app = express()

// Connect to database
connectDB()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Mounting routes
app.use('/api/products', require('./api/routes/productRoute'))
app.use('/api/orders', require('./api/routes/orderRoute'))
app.use('/api/users', require('./api/routes/userRoute'))
app.use('/api/payments', require('./api/routes/paymentRoute'))

const server = app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}`.green.bold))

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	server.close(() => process.exit(1));
});