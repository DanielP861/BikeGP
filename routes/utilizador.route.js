const express = require('express')
const router = express.Router()
const Utilizador = require('../model/utilizador.model')
const bcryptjs = require("bcryptjs");


router.post('/', (req,res)=>{
    //procurare se o equipamento esite
    Utilizador.find({'utilizador': {$eq: req.body.utilizador}})
    .exec()
    .then((utilizador,error)=>{    
        if(error) res.json({msg: 'Ocoreu um erro na base de dados'})
        if(utilizador==0){
            let encPass = bcryptjs.hashSync(escape(req.body.passe,bcryptjs.genSaltSync(2)))
            newutilizador = new Utilizador({              
                nome : req.body.nome,
                MoradaRua :  req.body.MoradaRua,
                MoradaNumero :  req.body.MoradaNumero,
                codigoPostal :  req.body.codigoPostal,
                email :  req.body.email,
                numTele :  req.body.numTele,
                nomeImpresa :  req.body.nomeImpresa,
                utilizador : req.body.utilizador,
                passe : encPass,
                nivel : req.body.nivel                
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

module.exports= router