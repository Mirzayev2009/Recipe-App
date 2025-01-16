import { useContext } from "react";
import { ContextData } from "../App";
import FoodItem from "./FoodItem";
import styles from "../style/mainpart.module.css"


export default function MainPart() {
    const {foodData,  setFoodId, } = useContext(ContextData);
    
    return (
        <div className={styles.mainPart}>
            {foodData.length === 0 ? (
                <h1>No Data Available</h1>
            ) : (
                foodData.map((item) => (
                   <FoodItem key={item.id} item = {item} setFoodId = {setFoodId}  />
                ))
            )}
        </div>
    );
}