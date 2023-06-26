import Styles from "./card.module.css"

export default function Card(props){
    


    return (
        <div className={Styles.card}>
        <div className={Styles.image}>
          <img src={props.image.url} alt={props.name} />
        </div>
        <div className={Styles.content}>
          <h2 className={Styles.title}>Nombre: {props.name}</h2>
          <div className={Styles.details}>
            <p className={Styles.diets}>Temperamentos: {props.temperament.join(", ")}</p>
          </div>
          <h2>Peso: {props.weight} LBS</h2>
        </div>
      </div>

    )
}

