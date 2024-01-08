const pool = require("../database/index")
const moment = require('moment')
const response = require('../utils/response')

const orderController = {
    add: async (req, res) => {
        try {
            const { idCategoryProduct, name, price, description, isActive } = req.body

            console.log(1, req.body);

            // const sql = `INSERT INTO product(id_category_product, name, price, img, description, is_active, created_date, updated_date) VALUES ('${idCategoryProduct}', '${name}', ${price}, '${dateTime}_${downloadURL.split("&")[1]}', '${description}', ${isActive}, '${moment().format('YYYY-MM-DD')}', '${moment().format('YYYY-MM-DD')}')`;
            // const [rows, fields] = await pool.query(sql, [idCategoryProduct, name, price, downloadURL, description, isActive])
            // res.json({
            //     data: rows
            // })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
}

module.exports = orderController