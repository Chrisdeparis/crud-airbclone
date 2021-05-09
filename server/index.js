const express = require('express')
const app = express()
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "airbclone"
})

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    const appartTitle = req.body.appartTitle;
    const appartDescription = req.body.appartDescription;
    const appartCondition = req.body.appartCondition;
    const appartEtoile = req.body.appartEtoile;
    const appartPrix = req.body.appartPrix;
    
    const sqlSelect = "SELECT * FROM appartements";
    db.query(sqlSelect, [appartTitle, appartDescription, appartCondition, appartEtoile, appartPrix], (err, result) => {
        res.send(result);
    });
})

app.post('/api/insert', (req, res) => {
    const appartTitle = req.body.appartTitle;
    const appartDescription = req.body.appartDescription;
    const appartCondition = req.body.appartCondition;
    const appartEtoile = req.body.appartEtoile;
    const appartPrix = req.body.appartPrix;


    const sqlInsert = "INSERT INTO appartements (appart_title, appart_description, appart_condition, appart_etoile, appart_prix) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [appartTitle, appartDescription, appartCondition, appartEtoile, appartPrix], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log('server running on port 3001');
});