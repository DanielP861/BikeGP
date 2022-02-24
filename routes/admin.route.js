const express = require('express')
const router = express.Router()
const authController = require('../controller/auth.controller')

router.post('/', authController.checkAuth, (req,res)=>{
    res.status(200).json({
        msg:'passou no controlo'
    })
})

module.exports = router