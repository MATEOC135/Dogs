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
            console.log("aquivaaaaaaaaaaaaaaaaaaaaa")  
            if (data) { 

              const Ndata= data.temperaments.map(e=>e.name).join(", ")
              const newData =  {
                ...data,
                temperaments:Ndata,
              };
           
              setCharacter(newData)
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
          <img src={character?.image}  alt={character?.name} />
        </div>
        <div className={Styles.content}>
            <h2> {character?.id}</h2>
          <h2 className={Styles.title}>Nombre: {character?.name}</h2>
          <p> ALTURA PROMEDIO: {character?.height} IMPERIAL  </p>
          <p>PESO PROMEDIO: {character?.weight && character?.weight} LBS</p> 
{            <p className={Styles.diets}>TEMPERAMENTOS ASOCIADOS: {character?.temperaments}</p>}
            <p>EDAD PROMEDIO: {character?.years}</p>

          
        </div>
      </div>

    )
}