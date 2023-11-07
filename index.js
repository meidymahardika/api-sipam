const express = require("express")
const cors = require('cors')
const { dirname } = require('path')

const app = express()
app.use(cors())

require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const productRouter = require('./routes/product.router')

app.use("/api/product", productRouter)
app.use("/img", express.static(dirname(require.main.filename) + '/img'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})