var express = require('express');
const SanPham = require('../model/sanphammodel')
const router = express.Router()

router.get('/Product',async (req,res)=>{
    let sp = await SanPham.find()
    res.status(200).json(sp)
    console.log(sp)
})

module.exports = router