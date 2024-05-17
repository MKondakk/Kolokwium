const express = require('express');
const mongoose = require('mongoose');
const Record = require('./schema');

const app = express();

app.use(express.json());
const port = 3000;

app.get('/records', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/records', async (req, res) => {
  const { stringValue, intValue } = req.body;
  try {
    const newRecord = await Record.create({ stringValue, intValue });
    res.status(201).json(newRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });
  

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err));