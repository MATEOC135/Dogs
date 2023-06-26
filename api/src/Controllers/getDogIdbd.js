const { Dog,Temperaments} = require("../db.js");


const getDogIdbd = async (req, res) => {
    const { id } = req.params;
    console.log("estamos en back")
    console.log(id)
    try {
        if (id) {
            const dbDog= await Dog.findByPk(id, { include: Temperaments });
            if (!dbDog) {
                return res.status(404).json({ error: "Los detalles de  esta raza no existen" });
            } else {
                console.log(dbDog)
                return res.status(200).json(dbDog)
                
            }
        }else{
            return res.status(400).json({ error: "falta proporcionar el id de la raza" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}







module.exports = { getDogIdbd };