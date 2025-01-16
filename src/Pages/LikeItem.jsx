import styles from "../style/likeItem.module.css"


export default function LikeItem({item}){
    return(
        <div className={styles.item}>
            {item.title}
            <img src={item.image} alt="" />
            <h2>Ready in {item.readyInMinutes} minutes</h2>
            <h2>Servings:{item.servings}</h2>
            <h2>{item.vegetarian ? "vegetarian" : "non vegetarian"}</h2>
        </div>
    )
}