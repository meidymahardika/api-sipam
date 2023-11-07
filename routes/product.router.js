const express = require("express")
const router = express.Router()
const upload = require('../utils/upload')

const productController = require("../controller/product.controller")

router.get("/", productController.getAll)
router.get("/list", productController.getList)
// router.get("/:id", productController.getById)
router.post("/", upload.array("files"), productController.add)
// router.put("/:id", productController.update)
// router.delete("/:id", productController.delete)

module.exports = router