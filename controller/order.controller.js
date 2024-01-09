const pool = require("../database/index")
const moment = require('moment')
const response = require('../utils/response')

const orderController = {
    add: async (req, res) => {
        try {
            const { orderNumber, queue, name, email, phone, paymentMethod, total } = req.body

            const sql = `INSERT INTO tb_order(order_number, queue, name, email, phone, payment_method, total, status, created_at, updated_at) VALUES ('${orderNumber}', ${queue}, '${name}', '${email}', '${phone}', ${paymentMethod}, ${total}, 'WAITING', '${moment().format('YYYY-MM-DD HH:mm:ss')}', '${moment().format('YYYY-MM-DD HH:mm:ss')}')`;
            await pool.query(sql, [orderNumber, queue, name, email, phone, paymentMethod, total], (err, result) => {
                if (err) {
                    console.error('Error inserting: ', err);
                    return res.status(500).send('Error inserting data');
                }
            
                res.json({
                    data: result
                })
            })
            const [id_order_rows, id_order_fields] = await pool.query(`SELECT id from tb_order ORDER BY id DESC LIMIT 1`)
            const id_order = id_order_rows[0].id
            req.body.detail.forEach((item,i) => {
                const sql = `INSERT INTO order_detail(id_order, id_product, qty) VALUES (${id_order}, ${item.id}, ${item.qty})`;
                pool.query(sql, [id_order, item.id, item.qty], (err, result) => {
                    if (err) {
                        console.error('Error inserting: ', err);
                        return res.status(500).send('Error inserting data');
                      }
                
                      console.log('Data inserted successfully');
                      res.status(200).send('Data inserted successfully');
                })
            })
            res.json({
                data: 'success'
            })
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
            const [rows, fields] = await pool.query(`SELECT * FROM tb_order LIMIT ${perpage} OFFSET ${pageNumber}`)
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
    },
    getQueue: async (req, res) => {
        try {
            const [rows, fields] = await pool.query('SELECT MAX(queue) AS max_queue FROM tb_order;')
            const payload = { 
                data: rows[0]
            }
            response(200, payload, "SUCCESS", res)
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
}

module.exports = orderController