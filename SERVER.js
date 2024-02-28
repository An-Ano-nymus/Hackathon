const https = require('https');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const path = require('path'); // Import path module

// Improved database creation logic (optional)
function createDatabaseAndTables(con) {
  con.query('create database if not exists hackathon;', (err) => {
    if (err) throw err;
    console.log('Database created');

    con.query('use hackathon;', (err) => {
      if (err) throw err;

      con.query('create table if not exists Donor(id int AUTO_INCREMENT PRIMARY KEY, Name varchar(50) not null, Phone_Number int(10) not null, email_id varchar(150) not null, Address varchar(200) not null);', (err) => {
        if (err) throw err;
        console.log('Donor table created');
      });

      con.query('create table if not exists NGO(id int AUTO_INCREMENT PRIMARY KEY, Name varchar(50) not null, Phone_Number int(10) not null, email_id varchar(150) not null, Address varchar(200) not null, Number_of_People int not null, VERIFICATION bool not null);', (err) => {
        if (err) throw err;
        console.log('NGO table created');
      });
    });
  });
}

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admin@123',
  port: 100,
  insecureAuth : true
});

con.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');

  // Call the database and table creation function
  createDatabaseAndTables(con); // Optional

  const server = https.createServer(app, (req, res) => {
    fs.readFile(path.join(__dirname, 'HACKATHON.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  }).listen(100);

  console.log('Server is running on port 8080');
});
