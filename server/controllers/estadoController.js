//Utilización del modelo de Estado
const EstadoModel = require("../models/estado");
 
//Método para obtener las estados
module.exports.get = async (req, res, next) => {
  const estados = await EstadoModel.find().exec();
  res.json(estados);
};
 
//Método para obtener una estados por ID
module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const Estado = await EstadoModel.findOne({ _id: id });
  res.json(Estado);
};
 
//Método para crear las estados
module.exports.create = (req, res, next) => {
  const Estado = new EstadoModel( req.body );
  Estado.save();
  res.json(Estado);
};
 
//Método para eliminar las estados
module.exports.delete = async (req, res, next) => {
  const Estado = await EstadoModel.findByIdAndDelete(req.params.id);
  // si Estado es null significa que no existe el registro
  if (Estado) {
    res.json({ result: "Estado borrada correctamente", Estado });
  } else {
    res.json({ result: "ID de la Estado no existe en los documentos de la BD", Estado });
  }
};
 
//Método para modificar las estados
module.exports.update = async (req, res, next) => {
  const Estado = await EstadoModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,     // ==> {numEstado: numEstado, nomCliente: nomCliente, dirCliente:dirCliente, telCliente:telCliente}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(Estado);
};