const { Dog, Temperaments } = require("../db.js")




const postDog= async (req, res) => {
    const { name, image, height,  weight, years, temperaments} = req.body;
 
  
    console.log(name, image, height,  weight, years, temperaments)
   

    try {
        console.log("entra al try")


        console.log(name, image, height,  weight, years, temperaments )
        if (!name || !image || !height || !weight || !years || !temperaments){
            return res.status(400).json({ message: 'faltan datos ' });
          }
        
        const [resp, created] = await Dog.findOrCreate({ where: { name, image, height,  weight, years} })
       

        if (temperaments && temperaments.length) {
            const temperamentsObject = await Temperaments.findAll({ where: { name: temperaments  } });
            console.log(temperamentsObject)
            await resp.setTemperaments(temperamentsObject)
        }
        res.status(200).json(resp);





    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}


module.exports = { postDog};
