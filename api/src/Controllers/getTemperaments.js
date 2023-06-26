require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios")
const { Temperaments } = require("../db.js")

console.log(API_KEY)
const getTemperaments = async (req, res) => {

    const temperamentsbd = await Temperaments.findAll();
    try {
        if (temperamentsbd.length === 0) {

            const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${API_KEY}`)



            let temperamentsR = [];
            data.forEach(objeto => {
                if (!objeto.hasOwnProperty('temperament')) {
                    temperamentsR.push("sin temperamentos asociados");
                } else {
                    const temperamentosSeparados = objeto.temperament.split(",");
                    temperamentsR = temperamentsR.concat(temperamentosSeparados.map(temperamento => temperamento.trim()));
                }
            });

            const temperamentosUnicos = Array.from(new Set(temperamentsR));

            console.log(temperamentosUnicos);
            const objTemperaments = temperamentosUnicos.map(diet1 => ({ name: diet1 }))//aqui creamos un array de objetos a pushear en DIets
            Temperaments.bulkCreate(objTemperaments) // aqui crea las filas


            const temperamentsCreated = await Temperaments.findAll()

            const temperamentsMap = temperamentsCreated.map(e => e.name)

            res.status(200).json(temperamentsMap)
        } else {
            console.log("entro al elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            const temperamentsName = temperamentsbd.map(e => e.name)
            res.status(200).json(temperamentsName)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getTemperaments };