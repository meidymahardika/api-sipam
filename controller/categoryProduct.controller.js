const pool = require("../database/index")
const moment = require('moment')
const response = require('../utils/response')

const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage')
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('../config/firebase.config')

const storage = getStorage();

const categoryProductController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from category_product")
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
            const [rows, fields] = await pool.query(`SELECT * FROM category_product LIMIT ${perpage} OFFSET ${pageNumber}`)
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
      const { name } = req.body
      try {
          const sql = `insert into category_product (name) values ('${name}')`
          const [rows, fields] = await pool.query(sql, [name])
          res.json({
              data: rows
          })
      } catch (error) {
          console.log(error)
          res.json({
              status: "error"
          })
      }
    },
    update: async (req, res) => {
        try {
            const { name } = req.body
            const { id } = req.params
            const sql = `update category_product set name = '${name}' where id = ${id}`
            const [rows, fields] = await pool.query(sql, [name, id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete from category_product where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }

}

module.exports = categoryProductController