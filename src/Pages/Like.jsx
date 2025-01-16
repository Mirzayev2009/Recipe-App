import { useContext } from "react"
import { ContextData } from "../App"
import LikeItem from "./LikeItem"
import styles from "../style/like.module.css"


export default function Like(){
    const {likeData} = useContext(ContextData)
    return(
       <div className={styles.box}>
             {likeData.length === 0 ? (
                 <h1>Theres is not any liked food</h1>
             ) : (
                 likeData.map((item) => (
                    <LikeItem key={item.id} item = {item}  />
                 ))
             )}
         </div>
    )
}