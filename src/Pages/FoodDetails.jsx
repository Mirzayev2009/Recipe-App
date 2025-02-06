import { useContext, useEffect, useState } from "react";
import { ContextData } from "../App";
import styles from "../style/foodDetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails() {
  const { foodId, likeData, setLike } = useContext(ContextData);
  const API_KEY = "YOUR_NEW_API_KEY"; // Replace with your new API key
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;

  const [food, setFood] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [cachedFood, setCachedFood] = useState({});

  useEffect(() => {
    if (!foodId) return; // Avoid fetching if there's no foodId

    // Check if the food details are already cached
    if (cachedFood[foodId]) {
      setFood(cachedFood[foodId]);
      setLoading(false);
      return;
    }

    async function FetchingDetails() {
      try {
        const res = await fetch(`${URL}?apiKey=${API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch food details.");
        const data = await res.json();
        
        setFood(data);
        setLoading(false);

        // Cache the fetched data to avoid re-fetching the same food
        setCachedFood((prev) => ({ ...prev, [foodId]: data }));
      } catch (error) {
        console.error("Error fetching food details:", error);
        setLoading(false);
        setFood(null); // Optionally, you can show an error message here
      }
    }

    FetchingDetails();
  }, [foodId, cachedFood]); // Re-run the effect if foodId changes

  const handleLike = () => {
    if (!food) return; // Prevent errors if food is null

    if (!likeData.some((likedFood) => likedFood.id === food.id)) {
      setLike([...likeData, food]);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  if (!food) {
    return <p>Error loading food details. Please try again later.</p>; // Show error message if data is null
  }

  return (
    <div>
      <img src={food?.image} alt={food?.title} className={styles.image} />
      <h1 className={styles.title}>{food?.title}</h1>
      <h2>Ready in {food?.readyInMinutes} minutes</h2>
      <h2>Servings: {food?.servings}</h2>
      <h2>{food?.vegetarian ? "Vegetarian" : "Non-Vegetarian"}</h2>
      <h1>Ingredients</h1>
      <div>
        <ItemList key={food?.id} item={food} isLoading={isLoading} />
      </div>
      <ol>
        {food?.analyzedInstructions[0]?.steps?.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))}
      </ol>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}
