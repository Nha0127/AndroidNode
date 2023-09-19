const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const proSchema = new Schema({
   name: String,
   price: Number,
   quantity: Number,
   description: String,
   image: String,
   catId: Schema.Types.ObjectId, //Dùng hàm để
   status: Boolean
});


module.exports = mongoose.model('Product', proSchema);