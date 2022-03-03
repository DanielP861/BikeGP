const mongoose = require('mongoose')

const utilizador = mongoose.Schema({

    "nome" : {"type": "String"},
    "moradaRua" : {"type": "String"},
    "moradaNumero" : {"type": "String"},
    "codigoPostal" : {"type": "String"},
    "email" : {"type": "String"},
    "numTele" : {"type": "String"},
    "nomeEmpresa" : {"type": "String"},
    "utilizador" : {"type": "String"},
    "passe" : {"type": "String"},
    "public_key" : {"type": "String"},
    "private_key" : {"type": "String"},
    "nivel" : {"type": "String"},
    "aceite": {"type": "Boolean"},
    registration_date: {"type": Date, default:Date.now}
})

utilizador.pre('save', function(callback) {
    this.public_key = Math.random().toString(36).substring(2) + this._id
    this.private_key = Math.random().toString(36).substring(2) + this._id
    callback()
})

module.exports = mongoose.model("utilizador",utilizador)