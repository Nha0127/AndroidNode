var express = require('express');
var app = express();
var path = require('path');
const { insert, deleteItem, update, getAll, getItemById } = require('./src/sanpham/sanphamcontrolle')
const bodyParser = require("body-parser");
const apiRouter = require('./src/router/ApiRouter')
const SanPham = require('./src/model/sanphammodel')
const User = require('./src/model/UserModel')
const UserRouter = require('./src/router/UserRouter')
//onst multer = require('multer');
const mongoose = require('mongoose');
var Schenma = mongoose.Schema;
const upload = require('./src/services/upload');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.use('/api', apiRouter)
app.use('/user', UserRouter)




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get('/', (rep, res) => {
    res.render('login');
})
app.get('/tinhdientich', (rep, res) => {
    res.render('tinhdientich');
})
app.get('/main.html', (rep, res) => {
    res.render('main');
})
// app.get('/sanpham.html', (rep, res) => {
//     res.render('sanpham');
// })
app.get('/sanphamnew.html', (rep, res) => {

    res.render('sanphamnew');
})
// app.get('/sanphamupdate.html', (rep, res) => {
//     res.render('sanphamupdate');
// })

// app.post('/them',async (req,res)=>{
//     console.log(req.body)
//     let newSanpham = await SanPham.create(req.body)
//     console.log(newSanpham)
//     res.redirect("/sanpham.html")
// })
// app.get('/sp', async(req, res) => {
//     let sanphamAll = await SanPham.create({
//     tenSp: '23',
//     gia: 2,
//     soLuong: 2,
//     hinhSp: '123'
//    })
//     //let sanpham = SanPham.find()
//     res.render('sanpham', {product: sanphamAll})
// })

// app.post('/sanpham.html',async(req,res) =>{
//     console.log(req.body)
//     let newSanpham = await SanPham.create(req.body)
//     console.log(newSanpham)
// })
// app.post('/sanpham.html', insert)

// app.get('/canh-day/:canhDay/chieu-cao/:chieuCao/', function (req, res) {
//     const canhDay = parseFloat(req.params.canhDay);
//     const chieuCao = parseFloat(req.params.chieuCao);
//     const dienTich = 0.5 * canhDay * chieuCao;

//     const html = `<h1> dien tich: ${dienTich}</h1>`;
//     res.send(html);
// })

app.get('/tinh', (req, res) => {
    res.render('tinh')
})
app.post('/tinh', (req, res) => {
    let canhday = req.body.canhday
    let chieucao = req.body.chieucao
    res.send(`<h1>Dien Tich: ${0.5 * canhday * chieucao} </h1>`)
})


async function connectDB() {
    const uri = "mongodb+srv://nhalast007:12345@cluster0.hkucvel.mongodb.net/test?retryWrites=true&w=majority"
    try {
        await mongoose.connect(uri);
        console.log('ok')
    } catch (e) {
        console.error(e);
    }
}
// app.get('/api/Product',async (req,res)=>{
//    let sp =  SanPham.find()
//     res.status(200).json(sp)
//     console.log(sp)
// })


connectDB();
app.get('/sanpham.html', async (req, res) => {
    let sanpham = await SanPham.find()
    res.render('sanpham', { product: sanpham })
})
app.post('/them', upload.single("hinhSp"), async function (req, res) {

    // const hinhSp = req.file.filename;
    // const { tenSp, gia, soLuong } = req.body;

    // insert(tenSp, gia, soLuong, hinhSp)
    if (req.file) {
        req.body.hinhSp = req.file.filename
    }
    await SanPham.create(req.body)
    res.redirect('/sanpham.html')

});
app.post('/sua/:id', upload.single("hinhSp"), async function (req, res) {

    const id = req.params.id;
    if (req.file) {
        req.body.hinhSp = req.file.filename;
    }
    //const {tenSp,gia,soLuong } = req.body;
    await SanPham.findByIdAndUpdate(id, req.body)
    //update(id,tenSp,gia,soLuong,hinhSp)
    res.redirect('/sanpham.html')

});
app.get('/sanphamupdate.html/:id', async function (req, res, next) {
    const id = req.params.id;
    const item = await getItemById(id);

    res.render('sanphamupdate', { item });
});
app.get('/delete/:id', async function (req, res) {
    const id = req.params.id;
    try {
        await deleteItem(id);
        res.redirect('/sanpham.html');
    } catch (error) {
        console.log(error);
    }
});
app.post('/', async (req, res) => {
    try {
        let user = await User.findOne({ Username: req.body.username, Password: req.body.password })
        res.redirect('/main.html')
    } catch (error) {
        res.send(error)
    }

})
app.listen("3000", () => {
    console.log("http://localhost:3000/");
})