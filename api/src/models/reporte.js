var mongoose = require('mongoose')
var Schema = mongoose.Schema

var reporte = new Schema({
  tarifaBase: { type: Number },
  tarifaIntermedia: { type: Number },
  tarifaPunta: { type: Number },
  demandaFacturable: { type: Number },
  total: { type: Number },
  totalIVA: { type: Number }
})

module.exports = mongoose.model('Reporte', reporte)
