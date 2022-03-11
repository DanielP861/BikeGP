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

router.get('/:_id', (req, res) => {
    console.log(req.params._id)
    Utilizador.findOne({'_id': {$eq: req.params._id}})
    .exec()
    .then((utilizador,error)=>{    
        if(error) throw error
        if(utilizador==0){
            res.json({
                type: 'success',
                msg: 'Utilizador não encontrado'
            })
        }
        else {
            let dados = {
                nome: utilizador.nome,
                nomeEmpresa: utilizador.nomeEmpresa,
                numTele: utilizador.numTele,
                moradaRua: utilizador.moradaRua,
                moradaNumero: utilizador.moradaNumero,
                email: utilizador.email,
                codigoPostal: utilizador.codigoPostal,
            }
            res.json({
                type:'success',
                msg: dados
            })
        }
            
    })
    .catch((error)=>{
        res.json({
            type: 'error',
            msg: 'Ocorreu um erro, tente mais tarde.'
        })
    })
    
})

module.exports = router;