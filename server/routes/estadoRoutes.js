//Express para agregar las rutas
const express = require("express");
const router = express.Router();
 
//Estado controller para los métodos definidos
const EstadoController = require("../controllers/estadoController");
 
//Definición de rutas para cada uno de los verbos para las Estados
router.get("/", EstadoController.get);
 
router.get("/:id", EstadoController.getById);
 
router.post("/", EstadoController.create);
 
router.delete("/:id", EstadoController.delete);
 
router.put("/:id", EstadoController.update);
 
module.exports = router;