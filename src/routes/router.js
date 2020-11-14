const express = require('express');
const users = require('../model/user');
const verify = require('../model/verify');
const router = express.Router();

router.get('/getUser/:mail/:password', (req, res)=>{
    let custMail = req.params.mail.toLowerCase();
    let custPassword = req.params.password;
    users.getUser(custMail, custPassword).then((userData)=>{
        if(userData){
            res.json(userData)
        }else{
            res.send("mail or password is incorrect")
        }
    })
})

router.get('/setUpDB', (req,res)=>{
    users.setUpDB().then((data)=>{
        res.json(data)
    })
})

router.post('/insertUser', (req,res)=>{
    try{
        let userObj = req.body;
        userObj.mail = userObj.mail.toLowerCase();
        let custUserID = userObj.userID;
        verify.findUserID(custUserID).then((userInDB)=>{
            if(userInDB){
                res.send("UserID not availabe")
            }else{
                users.insertNewUser(userObj).then((data)=>{
                    res.json(data)
                })
            }
        })
    }catch(error){
        console.log(error);
        res.send("some error occured");
    }
    
})

router.get('/getAllUsers', (req,res)=>{
    users.getAllUsers().then((allUsers)=>{
        res.json(allUsers)
    })
})

module.exports = router
