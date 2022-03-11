const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const Equipamento = require('../model/equipamento.model')

    router.post('/', (req,res)=>{
        console.log(req.body)
        Equipamento.findOneAndUpdate({'idEquip': {$eq: req.body.idEquip}}, {$set: {'lat':req.body.lat, 'lon':req.body.lon}},{new:true})
        .exec()
        .then((equip, error)=>{
            if(error) res.json({msg: 'Ocoreu um erro na base de dados'})
            if (equip == 0) {
                res.json({msg:'Equipamento não encontrado'})  
            }
            else {
                res.json({msg:'Equipamento atualizado'})    
            }
                
 
        })
        .catch(error=>{  
            console.log(error)      
        })
    })



module.exports = router;