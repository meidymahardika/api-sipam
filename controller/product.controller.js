const pool = require("../database/index")
const moment = require('moment')
const response = require('../utils/response')

const productController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from product")
            const payload = { data: rows }
            response(200, payload, "SUCCESS", res)
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getList: async (req, res) => {
        try {
            const { page, perpage } = req.query
            const pageNumber = (page-1)*perpage
            const [rows, fields] = await pool.query(`SELECT * FROM product LIMIT ${perpage} OFFSET ${pageNumber}`)
            const [total_rows, total_fields] = await pool.query(`SELECT COUNT(*) AS total_rows FROM product`)
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
    },
    // getById: async (req, res) => {
    //     try {
    //         const { id } = req.params
    //         const [rows, fields] = await pool.query("select * from posts where id = ?", [id])
    //         res.json({
    //             data: rows
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         res.json({
    //             status: "error"
    //         })
    //     }
    // },
    add: async (req, res) => {
        try {
            console.log(11, req.body);
            console.log(12, req.files);
            const { name, price, img, desc } = req.body

            // const sql = "insert into posts (title, content) values (?, ?)"
            // const sql = `INSERT INTO product (name, price, img, desc, is_active, created_date, updated_date) VALUES (${name}, ${price}, ${img}, ${desc}, ${isActive}, ${moment()}, ${moment()})`
            // const [rows, fields] = await pool.query(sql, [title, content])
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
    // update: async (req, res) => {
    //     try {
    //         const { title, content } = req.body
    //         const { id } = req.params
    //         const sql = "update posts set title = ?, content = ? where id = ?"
    //         const [rows, fields] = await pool.query(sql, [title, content, id])
    //         res.json({
    //             data: rows
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         res.json({
    //             status: "error"
    //         })
    //     }
    // }, 
    // delete: async (req, res) => {
    //     try {
    //         const { id } = req.params
    //         const [rows, fields] = await pool.query("delete from posts where id = ?", [id])
    //         res.json({
    //             data: rows
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         res.json({
    //             status: "error"
    //         })
    //     }
    // }

}

module.exports = productController