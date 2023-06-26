import Styles from "./InitialPage.module.css"
import { Link } from "react-router-dom";
export default function InitialPage() {
  return (
    <div className={Styles.entrypage}>
      
      <div className={Styles.imagecontainer}>
      {/* Imagen de muchas razas */}
      <img src="https://images.pexels.com/photos/5257587/pexels-photo-5257587.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Razas de perros" />
    </div>
      
   
    <div className={Styles.contentcontainer}>
      <h1 className={Styles.title}>DOGS API</h1>
      <p className={Styles.saying}>"Las razas del mundo te esperan"</p>
      <a href="/home" className={Styles.enterbutton}>Ingresar</a>
    </div>
  </div>
  );
}