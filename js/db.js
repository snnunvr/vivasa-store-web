const mongoose = require('mongoose');

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://snnunvr:Sinanunver111752@cluster0.ofyizmf.mongodb.net/<database>', 
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));

// Veri Modeli 
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

// Veri Ekleme
const newProduct = new Product({
  name: 'Ürün Adı',
  price: 19.99,
  description: 'Ürün açıklaması'
});

newProduct.save((err, product) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Ürün başarıyla eklendi.');
  }
});

const express = require('express');
const app = express();

// Tüm ürünleri getirme API rotası
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ürünler getirilemedi' });
  }
});

// Diğer API rotalarınızı burada tanımlayabilirsiniz

