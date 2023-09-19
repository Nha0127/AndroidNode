var express = require('express');
const User = require('../model/UserModel')
const router = express.Router()

router.post('/newuser', async (req, res) => {
    let checkUser = await User.findOne({Username: req.body.Username})
    if(checkUser){
       return res.status(400).json({
            status: 0,
            
        })
    }else{
    let user = await User.create({ Username: req.body.Username, Password: req.body.Password })
    
    res.status(200).json({
        status: 1,
        user
    })
    
     }
    // let user = await User.create({ Username: req.body.Username, Password: req.body.Password })
    
    // res.status(200).json({
    //     status: 1,
    //     user
    // })
    
})
router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ Username: req.body.Username, Password: req.body.Password })
        console.log(user)
        if (user) {
            res.status(200).json({
                status: 1,
                user

            })
        }else{
            res.status(400).json({
                status: 0,
                user

            })
        }


    } catch (error) {

        res.status(400).json({
            status: 0,
            message: error.message
        })
    }
})
module.exports = router