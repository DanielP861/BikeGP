const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const Equipamento = require('../model/equipamento.model')
const Utilizador = require('../model/utilizador.model')
const authController = require('../controller/auth.controller')

router.post('/', authController.checkAuth, (req, res) => {
    Equipamento.find()
    .exec()
    .then((equipamentos,error)=>{    
        if(error) res.json({msg: 'Ocoreu um erro na base de dados'})
        if(equipamentos!=0){
            let array = []
            for (i in equipamentos) {   
                if (equipamentos[i].idCliente == req.body._id) {
                    let json = { 
                        idEquip : equipamentos[i].idEquip, 
                        lat : equipamentos[i].lat,
                        lon : equipamentos[i].lon,   
                    } 
                    array.push(json)  
                }                
            }
            res.json(array)
        }          
    }) 
    .catch(error=>{
        console.log(error)
    })
})

module.exports = router;