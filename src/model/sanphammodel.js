const  mongoose  = require("mongoose")

const SanPhamSchema = new mongoose.Schema({
    tenSp: String,
    gia: Number,
    soLuong: Number,
    hinhSp: String,
})
const SanPham = mongoose.model('SanPham',SanPhamSchema)

module.exports = SanPham