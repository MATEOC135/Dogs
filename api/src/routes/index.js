const { Router } = require('express');
const { getAllDogs } =require("../Controllers/getAllDogs")
const { getDogsId } = require("../Controllers/getDogId")
const { getTemperaments }= require("../Controllers/getTemperaments")
const { postDog } = require("../Controllers/postDog");
const { getDogIdbd } = require('../Controllers/getDogIdbd');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs",getAllDogs ) 
router.get("/dogs/:id",getDogsId )
router.get("/temperaments",getTemperaments)
router.get("/dogs-bd/:id",getDogIdbd)
router.post("/dogs",postDog)

 
module.exports = router;
