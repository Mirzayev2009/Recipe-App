import styles from "../style/item.module.css"

export default function Item({food}){
    return <div>
              <div className={styles.item}>
                    <div className={styles.image}><img src={`https://spoonacular.com/cdn/ingredients_100x100/`+ food.image} alt="" /></div>
                    <div className={styles.miniItem}>
                        <h3>{food.name}</h3>
                        <h3>{food.amount} {food.unit}</h3>
                    </div>
            </div>
    </div>
}