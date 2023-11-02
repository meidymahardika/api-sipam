const express = require('express')
const app = express()
const port = 3005
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  response(200, "Hello World!", "Success", res)
})

// app.get('/find', (req, res) => {
//   const sql = `SELECT nama FROM mahasiswa WHERE nim = ${req.query.nim}`
//   db.query(sql, (error, result) => {
//     response(200, result, "find mahasiswa name", res)
//   })
// })

// app.post('/login', (req, res) => {
//     console.log({ requset: res.body });
//     res.send('success')
// })

app.get('/api/product', (req, res) => {
  const sql = "SELECT * FROM product"
  db.query(sql, (err, fields) => {
    if(err) throw err
    response(200, fields, "get all data from product", res)
  })
})

app.get('/mahasiswa/:nim', (req, res) => {
  const nim = req.params.nim
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (err, fields) => {
    if(err) throw err
    response(200, fields, "get data mahasiswa by nim", res)
  })
})

app.post('/mahasiswa', (req, res) => {
  const { nim, nama, kelas, alamat } = req.body
  const sql = `INSERT INTO mahasiswa (nim, nama, kelas, alamat) VALUES (${nim}, '${nama}', '${kelas}', '${alamat}')`
  db.query(sql, (err, fields) => {
    if(err) response(500, "invalid", "error", res)
    if(fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId
      }
      response(200, data, "Data Created Successfuly", res)
    }
  })
})

app.put('/', (req, res) => {
  const { nim, nama, kelas, alamat } = req.body
  const sql = `UPDATE mahasiswa SET nama = '${nama}',kelas = '${kelas}',alamat = '${alamat}' WHERE nim = ${nim}`
  db.query(sql, (err, fields) => {
    if(err) response(500, "invalid", "error", res)
    if(fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message
      }
      response(200, data, "Data Updated Successfuly", res)
    } else {
      response(404, "User not found", "Error", res)
    }
  })
})

app.delete('/', (req, res) => {
  const { nim, nama, kelas, alamat } = req.body
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (err, fields) => {
    if(err) response(500, "invalid", "error", res)
    if(fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows
      }
      response(200, data, "Data Deleted Successfuly", res)
    } else {
      response(404, "User not found", "Error", res)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})