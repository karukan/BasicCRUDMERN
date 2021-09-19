const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors());
app.use( express.json())
const mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'cool8calm',
    database:'shopnetorder'
})

app.post('/api/createOrder', (req, res) => {
    const name= req.body.name;
    const address= req.body.address;
    const product= req.body.product;
    const quantity= req.body.quantity;
    const price= req.body.price;

    db.query('INSERT INTO orders (name, address, product, quantity, price) VALUES (?, ?, ?, ?, ?)', 
    [name, address, product, quantity, price], (err, result ) => {
        if( err ){
            console.log( err );
        }
        else {
            res.send("Values inserted");
        }

    })
})

app.get("/api/orders", (req,res) => {
    db.query("SELECT * FROM orders", (err, result ) => {
        if( err ){
            console.log( err );
        }
        else {
            res.send(result);
        }
    })
})
app.listen(3001, () => {
    console.log("yey, your server is running on port 3001");
})