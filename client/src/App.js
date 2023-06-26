import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import InitialPage from "./Components/InitialPage/InitialPage"
import Nav from "./Components/nav/Nav"
import axios from "axios"
import { useDispatch } from "react-redux";
import  { fullDogs }  from "./Redux/actions/actions";
import Home from './Components/home/Home';
import Form from './Components/Form/Form';
import Detail from './Components/Detail/Detail';
import Detailbd from './Components/Detail/Detailbd';
function App() {
  const location = useLocation()
  const dispatch =useDispatch()

  const onSearch = async function (dogName){
 
    try {
      const {data} = await axios.get(`http://localhost:3001/dogs?name=${dogName}`)
      const data1 = data.map(objeto => {
        const newObjeto = { ...objeto }; // Copia superficial del objeto
        
        if (!newObjeto.hasOwnProperty('temperament')) {
          newObjeto.temperament = ["sin temperamentos asociados"];
        } else {
          newObjeto.temperament = newObjeto.temperament.split(", ");
        }
        
        return newObjeto;
      });
      dispatch(fullDogs(data1))
     
      
    } catch (error) {
      window.alert(error)
      
    }

  }


  return (
    <div>
     {location.pathname !== "/" && <Nav onSearch={onSearch}/>}
    <Routes>
      <Route exact path="/" element={<InitialPage />} />
      <Route exact path="/home" element={<Home  onSearch={onSearch} />} />
      <Route path="/form" element={<Form/>} />
      <Route path="/apidet/:id" element={<Detail/>} />
      <Route path="/detailBd/:id" element={<Detailbd/>} />
    </Routes>
  </div>
  );
}

export default App;
