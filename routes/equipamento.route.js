const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const Equipamento = require('../model/equipamento.model')


router.post('/', (req,res)=>{

    console.log(req.body)
    //procura se o equipamento esite
    Equipamento.find({'idEquip': {$eq: req.body.idEquip}})
    .exec()
    .then((equip,error)=>{
        if(error) res.json({msg: 'Ocoreu um erro na base de dados'})
        if(equip== 0){
            newEquip = new Equipamento({
                idEquip: req.body.idEquip,
                cliente: req.body.cliente,
                lat: 0,
                lon: 0
            })
            newEquip.save()
            .then((resultado,error)=>{
                if(error) res.json({msg: 'Ocorreu um erro na criação'})
                res.json(resultado)
            })
            .catch(error=>{
                console.log(error)
            })
            
        }
        else
        res.json({msg:'Equipamento existente'})
    })
    .catch(error=>{
        console.log(error)
    })
})
router.get('/', (req, res) => {
    Utilizador.find()
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
                _id: utilizador._id,
                nome: utilizador.nome,
                aceite: utilizador.aceite,
            }
            res.json({
                type:'success',
                msg:  console.log(dados)
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

module.exports= router