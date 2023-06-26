import {FULLDOGS,FILTERTEMP,ORDERALPH,ORDERBYKG,ORIGIN} from "../actions/types";


const initialState =  {
    allDogs:[],
    setDogs:[],
    filtered:[]
}


function rootReducer (state=initialState,{type,payload}){
    switch (type) {
        case FULLDOGS:
            return {
                allDogs:[...payload],
                setDogs:[...payload],
                filtered:[...payload]
            }
        case ORDERALPH:
            let orderCards;
        if(payload === "Ascendente"){
          orderCards =state.allDogs.sort((a, b) => a.name.localeCompare(b.name))
        }else{
          orderCards= state.allDogs.sort((a, b) => b.name.localeCompare(a.name))
       
        }return {
            ...state,
           allDogs: [...orderCards]
          };
        case FILTERTEMP:
            let filter =state.filtered.filter((item) =>   item.temperament.includes(payload)  )
          
            return  {
                ...state,
                allDogs: [...filter]
              };
       
        case ORDERBYKG:
            let orderByWeight;
            if (payload === "Menor peso -") {
              orderByWeight = state.allDogs.sort((a, b) => {
                const weightA = typeof a.weight.imperial === 'string' ? parseInt(a.weight.imperial.split(" - ")[0]) : 0;
                const weightB = typeof b.weight.imperial === 'string' ? parseInt(b.weight.imperial.split(" - ")[0]) : 0;
                return weightA - weightB;
              });
            } else {
              orderByWeight = state.allDogs.sort((a, b) => {
                const weightA = typeof a.weight.imperial === 'string' ? parseInt(a.weight.imperial.split(" - ")[0]) : 0;
                const weightB = typeof b.weight.imperial === 'string' ? parseInt(b.weight.imperial.split(" - ")[0]) : 0;
                return weightB - weightA;
              });
            }
            
            return {
              ...state,
              allDogs: [...orderByWeight]
            };

            case ORIGIN:
                let nameObjects;
                if (payload === "Created") {
                    nameObjects = state.filtered.filter(obj => obj.hasOwnProperty("years"));
                    
                } else if (payload === "Api") {
                    nameObjects = state.filtered.filter(obj => obj.hasOwnProperty("life_span"));
                    
                }
                return{
                    ...state,
                    allDogs: [...nameObjects]
                 
                  };
        
    
        default:
            return state;
    }
}

export default rootReducer;