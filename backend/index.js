// server
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to DB'))
.catch(err => console.error('DB connection error:', err));

const app = express();
app.use(express.json());

const api = require('./routes/api');
app.use('/api', api);

// Routes
app.get('/', (req, res) => {
  res.send('cheree is online!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});