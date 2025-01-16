import Item from "./Item"
import styles from "../style/itemList.module.css"


export default function ItemList({item, isLoading}) {
    return <div>
              <h2>Ingredients</h2>
               <div className={styles.box}>      {isLoading?<p>Loading...</p> :item.extendedIngredients.map((food)=> (
                <Item food={food}/>)) }</div>
             
    </div>
}