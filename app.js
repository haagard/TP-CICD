const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// DB Connection
mongoose.connect('mongodb://mongodb:27017/items-db')
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log('DB Error:', err));

// Routes
const Item = mongoose.model('Item', { name: String });

app.get('/items', async (req, res) => {
  res.json(await Item.find());
});

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  res.status(201).json(await newItem.save());
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
