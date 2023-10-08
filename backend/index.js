const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 5500;
const router = require("./route/index");
// var corOptions = {origin: 'https://localhost:8081'};

//middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database Configuration
const db = require('./sequlize/models');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: null,
    database: 'db_passifyv2',
    dialect: 'mysql',
    port: 3306,
    multipleStatements: true,
})

db.connect((err) => {
    if (err){
        return console.error(`Error: ${err.message}`);
    }
    console.log(`Connected to MySQL Server`)
})

app.get('/users', (req, res) => {
    let scriptQuery = `Select * from users;`
    db.query(scriptQuery, (err, results) =>{
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})


// Define routes
const router = require('./route');
app.use('/promotion', router.promotionRouter);
app.use(`/users`, router.userRouter);
app.use(`/locations`, router.locationRouter);


// Start the server
sequelize.sync().then(() => {
    app.get("/", (req, res) => {
        res.status(200).send(
            "<h4>Server Connected</h4>",
        );
    });
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});