const express = require('express');
const path = require('path');
const userRouter = require('./routes/users');

const app = express();
const PORT = 8081;

// Parse JSON request bodies
app.use(express.json());
// Add User Router
app.use('/api/v1/user', userRouter);

/*
- Create new html file name home.html
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});


/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/

app.get('/error', (req, res, next) => {
  const err = new Error('Test Error');
  next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send('Server Error');
});

app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});