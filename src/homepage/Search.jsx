import { useEffect, useState } from "react"
import styles from "../style/search.module.css"



const URL = "https://api.spoonacular.com/recipes/complexSearch"

const API_KEY = "6de54f2f3b2a4add863649073978c5ce"



export default function Search({setFoodData}){

    const [query, setQuery] = useState('')
    useEffect(()=>{
        async function FetchingData() {
            const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`)
            const data = await res.json()
            setFoodData(data.results)
            
        }
        FetchingData()
    }, [query])


  return(
    <div className={styles.inputCont}>
        <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} />
    </div>
  )
}