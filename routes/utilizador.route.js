const express = require('express')
const router = express.Router()
const Utilizador = require('../model/utilizador.model')
const bcryptjs = require("bcryptjs");


router.post('/', (req,res)=>{
    Utilizador.find({'utilizador': {$eq: req.body.utilizador}})
    .exec()
    .then((utilizador,error)=>{    
        if(error) res.json({msg: 'Ocoreu um erro na base de dados'})
        if(utilizador==0){
            let encPass = bcryptjs.hashSync(escape(req.body.passe,bcryptjs.genSaltSync(2)))
            newutilizador = new Utilizador({              
                nome : req.body.nome,
                moradaRua :  req.body.moradaRua,
                moradaNumero :  req.body.moradaNumero,
                codigoPostal :  req.body.codigoPostal,
                email :  req.body.email,
                numTele :  req.body.numTele,
                nomeEmpresa :  req.body.nomeEmpresa,
                utilizador : req.body.utilizador,
                passe : encPass,
                nivel : 'cliente',
                aceite : false,            
            })
            newutilizador.save()
            .then((resultado,error)=>{
                if(error) res.json({msg: 'Ocorreu um erro na criação'})
                res.json(resultado)
            })
            .catch(error=>{
                console.log(error)
            })
        }
        else
        res.json({msg:'Utilizador existente'})
    })
    .catch(error=>{
        console.log(error)
    })
    
})

router.get('/', (req,res)=>{
    Utilizador.find()
    .exec()
    .then((utilizadores,error)=>{    
        if(error) res.json({msg: 'Ocoreu um erro na base de dados'})
        if(utilizadores!=0){
            let array = []
            for(i in utilizadores){
                let json = {
                    _id : utilizadores[i]._id,
                    nome: utilizadores[i].nome,
                    nomeEmpresa: utilizadores[i].nomeEmpresa,
                    nivel: utilizadores[i].nivel,
                    aceite: utilizadores[i].aceite,       
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

router.patch('/:_id', (req, res) => {
    Utilizador.findOneAndUpdate({'_id': {$eq: req.params._id}}, {$set: {'aceite':true}},{new:true})
    .exec()
    .then((utilizador,error)=>{    
        if(error) throw error
        if(utilizador==0){
            res.json({
                type: 'success',
                msg: 'Utilizador não encontrado'
            })
        }
        else
            res.json({
                type:'success',
                msg: 'Utilizador atualizado'
            })
    })
    .catch((error)=>{
        res.json({
            type: 'error',
            msg: 'Ocorreu um erro, tente mais tarde.'
        })
    })
    
})

router.delete('/:_id', (req, res) => {
    Utilizador.findOneAndDelete({'_id': {$eq: req.params._id}})
    .exec()
    .then((utilizador,error)=>{    
        if(error) throw error
        if(utilizador==0){
            res.json({
                type: 'success',
                msg: 'Utilizador não encontrado'
            })
        }
        else
            res.json({
                type:'success',
                msg: 'Utilizador eliminado'
            })
    })
    .catch((error)=>{
        res.json({
            type: 'error',
            msg: 'Ocorreu um erro, tente mais tarde.'
        })
    })
    
})


module.exports= router