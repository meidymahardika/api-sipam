const express = require("express")
const router = express.Router()

const { upload } = require('../utils/multer')
const { getStorage ,ref ,uploadBytesResumable } = require('firebase/storage')

const productController = require("../controller/product.controller")

router.get("/", productController.getByCategory)
router.get("/list", productController.getList)
// router.get("/:id", productController.getById)
router.post("/", upload, productController.add)
// router.put("/:id", productController.update)
// router.delete("/:id", productController.delete)

module.exports = router