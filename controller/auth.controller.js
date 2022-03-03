const connection = require('../config/dbconnection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Utilizador = require('../model/utilizador.model')

exports.checkAuth = (req, res, callback) => {
    let token = req.headers.authorization
    if (!token) return res.status(406).json({msg: "não autorizado"})
    let payload = jwt.decode(token)
    Utilizador.findOne({
            'public_key': payload.pk
        })
        .exec()
        .then((utilizador, error) => {
            if (error) throw error
            if (!utilizador) return res.status(406).json({msg: "não autorizado"})
            jwt.verify(token, utilizador.private_key, (error) => {
                if (error) return res.status(406).json({msg: "não autorizado"})
                req.utilizador = utilizador
                return callback()
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

exports.login = (req,res) => {
    console.log(req.body)
    let utilizador = req.body.utilizador
    let passe = req.body.passe
    Utilizador.findOne({
        'utilizador': utilizador
    }, (error, utilizador) => {
        if (error) throw error
        if (!utilizador|| !bcrypt.compareSync(passe, utilizador.passe))
            return res.header('Authorization', null).status(404).json({msg:'Utilizador não encontrado'})
        let payload = {
            pk: utilizador.public_key
        }
        let options = {
            expiresIn: 15000,
            issuer: 'bikegp'
        }
        let token = jwt.sign(payload, utilizador.private_key, options)
        const dadosUtilizador = {
            _id: utilizador._id,
            nome: utilizador.utilizador,
            nivel: utilizador.nivel
        }
        return res.header('Authorization', token).status(200).json(dadosUtilizador)
    })
}