const pool = require("../database/index")
const moment = require('moment')
const response = require('../utils/response')

const orderController = {
    getList: async (req, res) => {
        try {
            const { page, perpage } = req.query
            const pageNumber = (page-1)*perpage
            const [rows, fields] = await pool.query(`SELECT * FROM report LIMIT ${perpage} OFFSET ${pageNumber}`)
            const [total_rows, total_fields] = await pool.query(`SELECT COUNT(*) AS total_rows FROM tb_order`)
            const total = total_rows[0].total_rows
            const payload = { 
                data: rows, 
                meta: { 
                    page: Number(page), 
                    pages: Math.floor((total + (perpage - 1)) / perpage),
                    perpage: Number(perpage), 
                    total: total 
                } 
            }
            response(200, payload, "SUCCESS", res)
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
}

module.exports = orderController