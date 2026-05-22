const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');

const { auth } = require('./middleware/auth.middleware');

const app = express();


// IMPORTANT CORS FIX

app.use(cors({
    origin: '*'
}));

app.use(express.json());


// DATABASE CONNECTION

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


// TEST ROUTE

app.get('/', (req, res) => {

    res.send('API Running');
});


// AUTH ROUTES

app.use('/api/auth', authRoutes);


// PROJECT ROUTES

app.use('/api/projects', projectRoutes);


// TASK ROUTES

app.use('/api/tasks', taskRoutes);


// PROTECTED ROUTE

app.get('/api/protected', auth, (req, res) => {

    res.json({
        message: 'Protected route accessed',
        user: req.user
    });

});


// SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});