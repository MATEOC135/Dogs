import { useState } from "react";
import styles from "../nav/Nav.module.css"
import dogFoto from "../../img/1.jpg"
import { Link } from "react-router-dom";

export default function Nav (props) {
    const [recipeName, setRecipeName] = useState("");

    const handleSearch = (e) => {
        let { value } = e.target;
        setRecipeName(value);
      }; 
    return (
        <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={dogFoto} alt="" className={styles.image} />
        </div>
        <div className={styles.content}>
          <div className={styles.menu}>
           <Link to="/home"><div className={styles.menuItem}>INICIO</div></Link> 
            <div className={styles.menuItem}>INFO</div>
            <div className={styles.menuItem}>REDES SOCIALES</div>
          </div>
          <div className={styles.searchAndButtons}>
            <input
              placeholder="BUSQUEDA"
              type="search"
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <button onClick={() => props.onSearch(recipeName)} className={styles.button}>
              BUSCAR RAZA
            </button>
            <Link to="/form"><button  className={styles.button}>AGREGAR AZA</button></Link>
          </div>
        </div>
      </div>
    )
}