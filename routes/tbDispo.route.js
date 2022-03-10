const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const Equipamento = require('../model/equipamento.model')
const Utilizador = require('../model/utilizador.model')
const authController = require('../controller/auth.controller')

router.get('/', (req, res) => {
    Equipamento.find()
    .exec()
    .then((Equipamento,error)=>{    
        if(error) res.json({msg: 'Ocoreu um erro na base de dados'})
        if(Equipamento!=0){
            let array = []
            for (i in Equipamento) {               
                    let json = {
                        idEquip : Equipamento[i].idEquip,
                        lat : Equipamento[i].lat,
                        lon : Equipamento[i].lon,
                    }
                    array.push(json)
                      
            }
            res.json(array)
        }          
    })
    .catch(error=>{
        console.log(error)
    })
})

module.exports = router;