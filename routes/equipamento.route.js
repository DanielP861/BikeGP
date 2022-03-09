const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const Equipamento = require('../model/equipamento.model')
const Utilizador = require('../model/utilizador.model')


router.post('/', (req,res)=>{
    //procura se o equipamento esite
    Equipamento.findOne({'idEquip': {$eq: req.body.idEquip}})
    .exec()
    .then((equip, error)=>{
        if(error) res.json({msg: 'Ocoreu um erro na base de dados'})
        if (equip == null) {
            console.log(equip)
            newEquip = new Equipamento({
                idEquip: req.body.idEquip,
                idCliente: req.body.cliente,
                lat: 0,
                lon: 0
            })
            newEquip.save()
            .then((resultado,error)=>{
                if(error) res.json({msg: 'Ocorreu um erro na criação'})
                res.json({msg: 'Equipamento associado ao cliente!'})
            })
            .catch(error=>{
                console.log(error)
            })
            
        }
        else {
            console.log(equip)
            res.json({msg:'Equipamento já associado a outro cliente'})
        }
            
    })
    .catch(error=>{
        console.log(error)
    })
})
router.get('/', (req, res) => {
    Utilizador.find()
    .exec()
    .then((utilizadores,error)=>{    
        if(error) res.json({msg: 'Ocoreu um erro na base de dados'})
        if(utilizadores!=0){
            let array = []
            for (i in utilizadores) {
                if (utilizadores[i].aceite === true) {
                    let json = {
                        _id : utilizadores[i]._id,
                        nome: utilizadores[i].nome
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

module.exports= router