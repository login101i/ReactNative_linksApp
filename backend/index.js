require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const linkRoutes = require('./routes/link');

const morgan = require('morgan');

const app = express();
const http = require('http').createServer(app);

// db connection
mongoose
	.connect(process.env.DATABASE)
	.then(() => console.log('DB connected'))
	.catch(err => console.log('DB CONNECTION ERROR: ', err));

// cors

const corsOptions = {
	origin: '*',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

// middlewares
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// route middlewares
app.use('/api', authRoutes);
app.use('/api', linkRoutes);

const port = process.env.PORT || 8800;

http.listen(port, () => console.log(`Server running on port ${port}`));
