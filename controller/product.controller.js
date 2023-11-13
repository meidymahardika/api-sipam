const pool = require("../database/index")
const moment = require('moment')
const response = require('../utils/response')

const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage')
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('../config/firebase.config')

const storage = getStorage();

const productController = {
    getByCategory: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT category_product.name AS category_name, product.* FROM category_product JOIN product ON category_product.id = product.id_category_product")
            const arr = []
            rows.forEach(item => {
                const category_product_id = item.id_category_product;
                const existingCategory = arr.find(cat => cat.id_category_product === category_product_id);
            
                if (existingCategory) {
                    existingCategory.data.push({
                        "id": item.id,
                        "name": item.name,
                        "price": item.price,
                        "img": item.img,
                        "description": item.description,
                        "is_active": item.is_active,
                        "created_date": item.created_date,
                        "updated_date": item.updated_date
                    });
                } else {
                    arr.push({
                        "id_category_product": category_product_id,
                        "category": item.category_name,
                        "data": [{
                            "id": item.id,
                            "name": item.name,
                            "price": item.price,
                            "img": item.img,
                            "description": item.description,
                            "is_active": item.is_active,
                            "created_date": item.created_date,
                            "updated_date": item.updated_date
                        }]
                    });
                }
            });
            
            const payload = { data: arr }
            console.log(1, rows);
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
            const dateTime = Date.now();

            const storageRef = ref(storage, `files/${dateTime}`);

            // Create file metadata including the content type
            const metadata = {
                contentType: req.file.mimetype,
            };

            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log(99, downloadURL.split("&")[1]);
            const { name, price, description } = req.body

            // const sql = "insert into posts (title, content) values (?, ?)"
            const sql = `INSERT INTO product(name, price, img, description, is_active, created_date, updated_date) VALUES ('${name}', ${price}, '${dateTime}_${downloadURL.split("&")[1]}', '${description}', ${1}, '${moment().format('YYYY-MM-DD')}', '${moment().format('YYYY-MM-DD')}')`;
            const [rows, fields] = await pool.query(sql, [name, price, downloadURL, description])
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