import { useEffect, useState } from "react"
import Styles from "../Card/card.module.css"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Apidet(){
    const {id} = useParams()
    const [character,setCharacter] = useState({})
    const [characterZ,setCharacterZ] = useState({})
    console.log(id)
    

    useEffect(() => {
        async function fetchData() {
          try {
            const { data } = await axios.get(`http://localhost:3001/dogs/${id}`)
            console.log(data)
            if (data) {
              setCharacter(data)
            } else {
              window.alert("No hay detalles para esta receta")
            }
          } catch (error) {
            window.alert(error)
          }
        }
        fetchData()
        
        
    



       
      }, [id])
      const {name,height,weight,life_span,image,temperament}= character
    console.log(character)  
    return(
        <div className={Styles.card}>
        <div className={Styles.image}>
          <img src={image?.url}  alt={name} />
        </div>
        <div className={Styles.content}>
            <h2> {id}</h2>
          <h2 className={Styles.title}>Nombre: {name}</h2>
          <p>{height?.imperial}</p>
          <p>Peso:{weight && weight?.imperial} LBS</p> 
            <p className={Styles.diets}>Temperamentos: {temperament}</p>
            <p>{life_span}</p>

          
        </div>
      </div>

    )
}