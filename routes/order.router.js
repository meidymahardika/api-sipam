const express = require("express")
const router = express.Router()

const orderController = require("../controller/order.controller")

router.post("/", orderController.add)
router.get("/queue", orderController.getQueue)

module.exports = router