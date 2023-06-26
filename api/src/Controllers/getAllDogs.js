require('dotenv').config();
const { Op } = require('sequelize');
const { API_KEY } = process.env;
const axios = require("axios")
const { Dog, Temperaments } = require("../db.js");

const getAllDogs = async (req, res) => {
    const { name } = req.query
    try {
        const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${API_KEY}`)

        if (name === "") {

            const dbDogs = await Dog.findAll()

            const allDo= [ ...dbDogs,...data]
            res.status(200).json(allDo)

            
        } else {
            let searchName = name.toLowerCase()
            const dbDogs = await Dog.findAll({
                where: { name: { [Op.iLike]: `%${searchName}%` } },
                include: Temperaments
            })
            const apiDogsFilter = await data.filter(dog => {
                const DogName = dog.name?.toLowerCase();
                return DogName.includes(searchName);
            });
            const totalDogs = [...apiDogsFilter, ...dbDogs]
            if (!totalDogs.length) {
                res.status(400).json({ message: "No se encontraron perros  con este nombre" });
            } else {
                res.status(200).json(totalDogs);

            }

        }




    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message })

    }


}



module.exports = { getAllDogs };