import { useState } from "react";
import {  connect,useDispatch } from "react-redux";
import { useEffect } from "react";
import Styles from "./Home.module.css"
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import { filterTemp, orderAplh,origin, orderByKg} from "../../Redux/actions/actions";
import axios from "axios"
export  function Home (props ) {
    const dispatch = useDispatch()
    const [dogsLocal, setDogsLocal] = useState([]);
    useEffect(()=>{
        setDogsLocal(props.allDogs)
    },[props.allDogs])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); 
    const totalPages = Math.ceil(dogsLocal.length / itemsPerPage);

    const [temps, setTemps] = useState([]);

    useEffect(()=>{
      async function datainfo(){
          try { 
              const {data} = await axios.get(`http://localhost:3001/temperaments`)
              if (data) {
                setTemps(data) 
              } else {
                  window.alert("no hay temperamentos: probelmas en el componente cards")
                  
              }
          } catch (error) {
              window.alert(error)    
          }     
    }
      datainfo()
      props.onSearch("")
      
  },[])

  
  




      const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }


  const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;

 const currentDogs = dogsLocal.slice(indexOfFirstItem, indexOfLastItem);
 const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);  
};

console.log(currentDogs)
    return(
        <div> 
<div className={Styles.container}>
    
    <div className={Styles.options}>
    <select className={Styles.myselect} onChange={(e) => dispatch(filterTemp(e.target.value))}>
        {temps.map((e, i) => (
          <option value={e} key={i}>
            {e}
          </option>
        ))}
        
      </select>
   
      <br />
      <select className={Styles.myselect} onChange={(e) => dispatch(orderAplh(e.target.value))}>
        {["Ascendente", "Descendente"].map((e, i) => (
          <option value={e} key={i}>
            {e}
          </option>
        ))}
      </select>
      <br />
      <select className={Styles.myselect} onChange={(e) => dispatch(orderByKg(e.target.value))}>
        {["Mayor peso +", "Menor peso -"].map((e, i) => (
          <option value={e} key={i}>
            {e}
          </option>
        ))}
        
      </select>
     <br />
      <select className={Styles.myselect} onChange={(e) => dispatch(origin(e.target.value))}>
        {["Created", "Api"].map((e, i) => (
          <option value={e} key={i}>
            {e}
          </option>
        ))}
        
      </select>
      <br />

      <button className={Styles.myselect} onClick={()=>props.onSearch("")} >RESET</button>

    </div>
    <div>
    <div className={Styles.cards}>{currentDogs.map((dog) => (
      dog.years?
      <Link to={`/detailBd/${dog.id}`} key={dog.id}>  <Card key={dog.id}
      name={dog.name}
      image={dog.image} 
      temperament={dog.temperaments.map(e=>e.name)} 
      weight={dog.weight}
      /> </Link>:<Link to={`/apidet/${dog.id}`}  key={dog.id} ><Card key={dog.id}
    name={dog.name}
    image={dog.image.url} 
    temperament={dog.temperament}
    weight={dog.weight.imperial}
    /> </Link>

    
    ))}
    
    
     </div>
    <div>  <ul className={Styles.ulpg} >
        {pages.map((page) => (
          <li className={Styles.lipg}  key={page} >
            <button className={`${Styles.buttonpg} ${currentPage === page ? Styles.active : ''}`} 
             onClick={() => handlePageChange(page)}>{page}</button>
          </li>
        ))}
      </ul>
      </div>
    </div>

    
    </div>



        
      
      
      </div>
      





        
    )
}
export function mapStateToProps(state) {
    return {
      allDogs: state.allDogs,
    };
  }
  
  export default connect(mapStateToProps, null)(Home);
  
