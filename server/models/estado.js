//Uso de la libreía Mongoose
const { Schema, model } = require("mongoose");
 
//Creación del esquema de Estado
const EstadoSchema = new Schema(
  {
    numFactura: {
      type: Number,
      unique: true,
      required: true,
    },
    nomCliente: String,
    dirCliente: String,
    telCliente: Number
  },
);
 
//Creación del modelo, que sería el que une el esquema 
//con la colección de documentos en mongo
const EstadoModel = model("Estados", EstadoSchema);
 
//Hace visible en modelo con el module.exports
module.exports = EstadoModel;