const SanPham = require("../model/sanphammodel")

async function insert(tenSp,gia,soLuong,hinhSp){
    const pro = new SanPham({
        tenSp:tenSp,
        gia:gia,
        soLuong:soLuong,
        hinhSp:hinhSp,
    })
    await pro.save()
        
    // if(req.file){
    //     req.body.hinhSp = req.file.filename
    // }
    // let newSanpham = await SanPham.create(req.body)
    // console.log(newSanpham)
    // res.redirect("/sanpham.html")
}
async function update(id,tenSp,gia,soLuong,hinhSp){
    const pro = {
        tenSp:tenSp,
        gia:gia,
        soLuong:soLuong,
        hinhSp:hinhSp,
    }
    await SanPham.updateOne({_id: id},pro)
    
}
async function deleteItem(id) {
    await SanPham.deleteOne({ _id: id })
        .then(
            console.log("Delete thành công!")
        ).catch(error => {
            throw error;
        });
}
async function getAll() {
    
    const Data = await SanPham.find()
        .then(
            //console.log("Lấy dữ liệu thành công!")
        ).catch(error => {
            throw error;
        });;
    return Data;
}
async function getItemById(id) {
    const item = await SanPham.findById(id)
        .then(
            //console.log("Lấy dữ liệu thành công!")
        ).catch(error => {
            throw error;
        });
    return item;
}
module.exports = {insert, deleteItem,update,getAll,getItemById}
