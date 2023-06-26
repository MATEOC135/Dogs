import { useEffect, useState } from "react";
import Styles from "./Form.module.css"
import axios from "axios"
import validation from "./validation";


export default function Form (){
    const [formData, setFormData] = useState({
        name: '',
        height: '',
        weight: "",
        years: '',
        image: '',
        temperaments:  []
      });
    const [temperaments, setTemperaments] = useState([])
    //---------------------------------min y max de peso
    const [minValue, setMinValue] = useState(1);
    const [maxValue, setMaxValue] = useState(100);
   
    const handleMinChange = (event) => {
      setMinValue(event.target.value);
    };
  
    const handleMaxChange = (event) => {
      setMaxValue(event.target.value);
    };
    //------------------------------------------------------min y max de altura
    
    const [minValueZ, setMinValueZ] = useState(1);
    const [maxValueZ, setMaxValueZ] = useState(100);
  
    const handleMinChangeZ = (event) => {
      setMinValueZ(event.target.value);
    };
  
    const handleMaxChangeZ = (event) => {
      setMaxValueZ(event.target.value);
    };
    //                    min y max de edad
    const [minValueY, setMinValueY] = useState(1);
    const [maxValueY, setMaxValueY] = useState(100);
   
    const handleMinChangeY = (event) => {
      setMinValueY(event.target.value);
    };
  
    const handleMaxChangeY = (event) => {
      setMaxValueY(event.target.value);
    };




 

      console.log(formData)
      const [errors, setErrors] = useState({
        name: '',
        height: '',
        weight: "",
        years: '',
        image: '',
        temperaments: []
        });
        console.log(errors)

        const handleInputChange = (e) => {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            });
        
            setErrors(
              validation({
                ...formData,
                [e.target.name]: e.target.value,
              })
            );
          };
  
        useEffect(()=>{
            setFormData({
                ...formData,
                weight: `${minValue.toString()} - ${maxValue.toString()}`,
                height:  `${minValueZ.toString()} - ${maxValueZ.toString()}`,
                years:  `${minValueY.toString()} - ${maxValueY.toString()}`
              });   
               
           }, [minValue, maxValue, minValueZ, maxValueZ]);
   
        console.log(formData)

   
   useEffect(()=>{
    const getData =async ()=>{
        const {data} = await axios.get("http://localhost:3001/temperaments")
        try {
            if (data) {    
                setTemperaments(data)     
            } else {
                window.alert("Error en la peticion de dietas posiblemente el servidor no esta levantado")
            }
        } catch (error) {
            window.alert("no se pudo traer la info")

        } 
    }
    getData()
       
   },[]);
     
    const handleCheckboxChange = (e) => {
    const tempSeleccionada = e.target.value;
    let temperaments = [...formData.temperaments];
  
    if (e.target.checked) {
      temperaments.push(tempSeleccionada);
      setErrors(
        validation({
          ...formData,
          [e.target.name]:temperaments,
        })
      );
    } else {
      temperaments = temperaments.filter((tipo) => tipo !== tempSeleccionada);
      setErrors(
        validation({
          ...formData,
          [e.target.name]:temperaments,
        })
      );
    }

  
    setFormData({ ...formData, temperaments });
   
  };
    

 
    
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    console.log(errors) 
    console.log("..........1...............")
    
    try {
      
      if (Object.keys(errors).length === 0) {
        const response = await axios.post('http://localhost:3001/dogs', formData);
        console.log(".............2............")  
        console.log(errors) 
        setFormData({
            name: '',
            height: '',
            weight: "",
            years: '',
            image: '',
            temperaments: []
        });
        window.alert("La Raza ha sido creada")
       
      } else {
        console.log(errors)
        window.alert('Faltan datos en el formulario');
       
          
      }
      console.log("..............3...........")
    } catch (error) {
      console.log(error);
      window.alert('Hubo un error al enviar la solicitud');
    }
  };

  

  
    return(
<div className={Styles.container}>
 
      <div className={Styles.div}>
        <h1>INGRESE NUEVA RAZA</h1>
        <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input name="name" placeholder="Ingresa el nombre  aquí" type="text" value={formData.name} onChange={handleInputChange}  className={errors.name && Styles.warning} />  <p className={errors.name && Styles.danger} ><br />{errors.name}</p>
      </label>
      
      
      <br />
      <label>
        Altura de la raza: <div></div>
        <div>
      <input type="range" min="1" max="100" value={minValueZ} onChange={handleMinChangeZ} />
      <input type="range" min={minValueZ} max="100" value={maxValueZ} onChange={handleMaxChangeZ} />
      <p>MIN: {minValueZ} ---  MAX: {maxValueZ}</p>
    </div> </label>
      
      <br />
      <label>
        Peso de la raza: <div></div>
        <div>
      <input type="range" min="1" max="100" value={minValue} onChange={handleMinChange} />
      <input type="range" min={minValue} max="100" value={maxValue} onChange={handleMaxChange} />
      <p>MIN: {minValue} ---  MAX: {maxValue}</p>
    </div> </label>
    <br />
    <label>
        Edad de la raza: <div></div>
        <div>
      <input type="range" min="1" max="100" value={minValueY} onChange={handleMinChangeY} />
      <input type="range" min={minValueY} max="100" value={maxValueY} onChange={handleMaxChangeY} />
      <p>MIN: {minValueY} ---  MAX: {maxValueY}</p>
    </div> </label>
      

   
      <br />
      <label>
      Imagen:
        <input name="image" type="text"  placeholder="Ingresa la URL aquí" value={formData.image} onChange={handleInputChange} className={errors.image && Styles.warning}  /> <p className={errors.image && Styles.danger} >{errors.image}</p>
      </label>

     
      <br />
      <h2>Tipos de dieta</h2>
      <div className={Styles.container1} >
      
      {temperaments.map((el) => (
        <div className={Styles.checkboxcontainer} key={el}>
          <label className={Styles.label1}>
            <input name="temperaments" type="checkbox" value={el} checked={formData.temperaments.includes(el)} onChange={handleCheckboxChange} />
            {el}
          </label>
         
        </div>
      ))}
    </div>
    <p className={errors.temperaments && Styles.danger} >{errors.temperaments}</p>
      <br />
      <button type="submit">Enviar</button>
    </form>
      </div>
    </div>)
}