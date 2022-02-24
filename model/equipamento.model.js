const mongoose = require('mongoose')

const equipamento = mongoose.Schema({

    "cliente" : {"type": "String"},
    "idEquip" : {"type": "String"},
    "lat" : {"type": "Number"},
    "lon" : {"type": "Number"},
    dete: {"type": Date, default:Date.now}
})

module.exports = mongoose.model("equipamento",equipamento)