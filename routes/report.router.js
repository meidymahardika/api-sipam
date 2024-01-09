const express = require("express")
const router = express.Router()

const reportController = require("../controller/report.controller")

router.get("/list", reportController.getList)

module.exports = router