import { createContext, useState } from "react"
import MainPart from "./homepage/MainPart"
import Search from "./homepage/Search"
import Nav from "./homepage/nav"
import FoodDetails from "./Pages/FoodDetails"
export const ContextData = createContext()
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Like from "./Pages/Like"

function App() {
  const [foodData, setFoodData] = useState([])
  const [foodId, setFoodId] = useState("")
  const [likeData, setLike] = useState([])

  // console.log(likeData);
  
  // console.log(foodId);
  
  
  
  function ConditionalSearch ({setFoodData}){
    const location = useLocation()

    if(location.pathname === "/"){
      return <Search setFoodData={setFoodData}/>
    }
    return null
  }

  return (
  <BrowserRouter>
        <Nav/>
       <ConditionalSearch  setFoodData = {setFoodData}/>
        <ContextData.Provider value ={{foodData, foodId, likeData,  setFoodId, setLike} }>
        <Routes>
           <Route path="/" element = {<MainPart/>}/>
           <Route path="/food-details" element = {<FoodDetails />}/>
           <Route path="/liked-foods" element = {<Like/>}/>
        </Routes>
       </ContextData.Provider>
  </BrowserRouter>
  )
}

export default App
