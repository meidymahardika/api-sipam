const express = require("express")
const cors = require('cors')
// const { dirname } = require('path')
// const bodyParser = require('body-parser');

const app = express()
app.use(cors())

require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productRouter = require('./routes/product.router')
const categoryProductRouter = require('./routes/categoryProduct.router')
const orderRouter = require('./routes/order.router')
const reportRouter = require('./routes/report.router')

app.use("/api/product", productRouter)
app.use("/api/category-product", categoryProductRouter)
app.use("/api/order", orderRouter)
app.use("/api/report", reportRouter)
// app.use("/img", express.static(dirname(require?.main?.filename) + '/img'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})