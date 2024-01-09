const express = require("express")
const router = express.Router()

const orderController = require("../controller/order.controller")

router.post("/", orderController.add)
router.get("/list", orderController.getList)
router.get("/queue", orderController.getQueue)
router.get("/next-queue", orderController.getNextQueue)
router.get("/detail/:id", orderController.getDetailOrder)
router.put("/update-status-paid/:id", orderController.updateStatusPaid)


module.exports = router