const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const productRouter = require('./routes/product.router')

app.use("/api/product", productRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})