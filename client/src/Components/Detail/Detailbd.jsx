import { useEffect, useState } from "react"
import Styles from "../Card/card.module.css"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Detailbd(){
    const {id} = useParams()
    const [character,setCharacter] = useState({})
    console.log(id)
 

    useEffect(() => {
        async function fetchData() {
          try {
            const { data } = await axios.get(`http://localhost:3001/dogs-bd/${id}`)
            console.log(data)
            if (data) {
              setCharacter(data)
            } else {
              window.alert("No hay detalles para esta Raza")
            }
          } catch (error) {
            window.alert(error)
          }
        }
        fetchData()
      }, [id])
    console.log(character)  
    return(
        <div className={Styles.card}>
        <div className={Styles.image}>
          <img src={character.image}  alt={character.name} />
        </div>
        <div className={Styles.content}>
            <h2> {character.id}</h2>
          <h2 className={Styles.title}>Nombre: {character.name}</h2>
          <p>{character.height}</p>
          <p>Peso:{character.weight && character.weight} LBS</p> 
            <p className={Styles.diets}>Temperamentos: {character.temperament}</p>
            <p>{character.life_span}</p>

          
        </div>
      </div>

    )
}