const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'signup'
});

const port = process.env.PORT || 7999;



app.post('/login', (req, res) => {
  //console.log('inserting into DB');
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  console.log("Values of email and password are", req.body.email, req.body.password);
  db.query(sql, [req.body.email,req.body.password], (err, data) => {
    if (err) {
      console.log("The error is", err);
      //res.status(500).send(err);
      return res.status(500).send(err);
    } 
    if (data.length > 0) {
      console.log("Successfully logged in");
      return res.json("Successfully logged in");
    }
    else {
      return res.json("Failed to log in");
    }
  });
});



app.post('/signup', (req, res) => {
  console.log('inserting into DB');
  const sql = "INSERT INTO login(`name`, `email`, `password`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password
  ]
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log("The error is", err);
      //res.status(500).send(err);
      return res.status(500).send(err);
    } else {
      return res.status(200).send(data); 
      console.log("Successfully inserted into DB"); 
    }
  });
});





app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});