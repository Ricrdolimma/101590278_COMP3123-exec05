const express = require('express');
const fs = require('fs');
const path = require('path');

const routerUser = express.Router();

/*
- Return all details from user.json file to client as JSON format
*/
routerUser.get('/profile', (req, res) => {
  const filePath = path.join(__dirname, '../user.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Server Error');
    }

    const users = JSON.parse(data);
    res.json(users);
  });
});

/*
- Modify /login router to accept username and password as JSON body parameter
*/
routerUser.post('/login', (req, res) => {

  const { username, password } = req.body;

  const filePath = path.join(__dirname, '../user.json');

  fs.readFile(filePath, 'utf8', (err, data) => {

    if (err) {
      return res.status(500).send('Server Error');
    }

    const user = JSON.parse(data);

    if (username !== user.username) {
      return res.json({
        status: false,
        message: "User Name is invalid"
      });
    }

    if (password !== user.password) {
      return res.json({
        status: false,
        message: "Password is invalid"
      });
    }

    res.json({
      status: true,
      message: "User Is valid"
    });
  });
});


/*
- Modify /logout route to accept username as parameter and display message
*/
routerUser.get('/logout/:username', (req, res) => {
  const username = req.params.username;

  res.send(`<b>${username} successfully logged out.</b>`);
});

module.exports = routerUser;