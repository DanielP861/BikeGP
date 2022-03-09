const mongoose = require('mongoose')

const equipamento = mongoose.Schema({

    "idCliente" : {"type": "String"},
    "idEquip" : {"type": "String"},
    "lat" : {"type": "Number"},
    "lon" : {"type": "Number"},
    date: {"type": Date, default:Date.now}
})

module.exports = mongoose.model("equipamento",equipamento)