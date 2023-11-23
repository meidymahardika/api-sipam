const express = require("express")
const router = express.Router()


const categoryProductController = require("../controller/categoryProduct.controller")

router.get("/", categoryProductController.getAll)
router.get("/list", categoryProductController.getList)
router.post("/", categoryProductController.add)
router.put("/:id", categoryProductController.update)
router.delete("/:id", categoryProductController.delete)

module.exports = router