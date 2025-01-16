import { useContext, useEffect, useState } from "react";
import { ContextData } from "../App";
import styles from "../style/foodDetails.module.css"
import ItemList from "./ItemList";


export default function FoodDetails() {
    const { foodId , likeData, setLike } = useContext(ContextData); // Destructure foodId from context
    const API_KEY = "6de54f2f3b2a4add863649073978c5ce";
    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;

    const [food, setFood] = useState(null); // Default to null instead of an empty string
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        if (!foodId) return; // Avoid fetching if there's no foodId

        async function FetchingDetails() {
            try {
                const res = await fetch(`${URL}?apiKey=${API_KEY}`);
                const data = await res.json();
                setFood(data); // Set the food details state
                setLoading(false)
                console.log(data);
            } catch (error) {
                console.error("Error fetching food details:", error);
            }
        }

        FetchingDetails();
    }, [foodId]); // Re-fetch when foodId changes
    console.log(likeData);
    const handleLike = ()=>{
        if(! likeData.some((likedFood)=> likedFood.id === food.id)){
            setLike(...likeData, food)
        }
    }

    return (
        <div>
            {foodId ? (
                <div>
                    <img src={food?.image} alt={food?.title} className={styles.image} />
                    <h1 className={styles.title}>{food?.title}</h1>
                    <h2>Ready in {food?.readyInMinutes} minutes</h2>
                    <h2>Servings:{food?.servings}</h2>
                    <h2>{food?.vegetarian ? "vegetarian" : "non vegetarian"}</h2>
                    <h1>Ingredients</h1>
                    <div>
                        <ItemList key={food?.id} item = {food} isLoading ={isLoading}/>
                    </div>
                    <ol>      {isLoading ? <p>Loading...</p> : food.analyzedInstructions[0].steps.map((step)=>(<li>{step.step}</li>))}</ol>

               <button onClick={handleLike}>Like</button>
                     
                </div>
            ) : (
                <p>Select a food item to see details</p>
            )}
        </div>
    );
}