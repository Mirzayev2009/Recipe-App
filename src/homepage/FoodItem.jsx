import { Link } from "react-router-dom";
import styles from "../style/foodItem.module.css"

export default function FoodItem({ item, setFoodId}) {
   

    return (
    <Link to = "/food-details">
        <div onClick={()=>setFoodId(item.id)} className={styles.box}>
            <h1 className={styles.title}>{item.title}</h1>
            <img src={item.image} alt={item.title} className={styles.image} />    
            <div className={styles.info}>
                <h2>Ready in {item.readyInMinutes} minutes</h2>
                <h2>Servings:{item.servings}</h2>
                <h2>{item.vegetarian ? "vegetarian" : "non vegetarian"}</h2>
            </div>
        </div>
    </Link>
    );
}