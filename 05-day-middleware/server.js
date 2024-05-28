import express from 'express';
import requestLogger from './middlewares/request-logger.js';

const app = express();

// To use the middleware for all routes
// app.use(requestLogger);
app.use(express.json());

// Hello world 
app.get('/hello', (req, res) => {
    res.send('Hello, world!')
})

// User handler
app.get('/users', requestLogger, (req, res) => {
    res.send('User list');
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})