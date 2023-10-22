const mongoose = require('mongoose');

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://snnunvr:Sinanunver111752@cluster0.ofyizmf.mongodb.net/<database>', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
db.once('open', () => {
  console.log('MongoDB bağlantısı başarılı.');
});

// Veri Modeli 
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product
};
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
  const { Product } = require('./db'); // db.js dosyasının yolunu düzeltin
  
  // Rest of your code
  

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

app.listen(3000, () => {
  console.log('Sunucu çalışıyor. Port 3000');
});
