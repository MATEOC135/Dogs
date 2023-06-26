require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios")

console.log(API_KEY)
const getDogsId = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        if (id) {
            const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${API_KEY}`)
            const objetoEncontrado = data.find(objeto => objeto.id === parseInt(id));
            console.log(objetoEncontrado)


         
            res.status(200).json(objetoEncontrado)

        }


    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}







module.exports = {getDogsId};