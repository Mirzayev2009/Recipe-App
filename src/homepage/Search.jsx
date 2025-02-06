import { useEffect, useState } from "react";
import styles from "../style/search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "6de54f2f3b2a4add863649073978c5ce";

export default function Search({ setFoodData }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Debounce time (500ms)

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) return;

    async function FetchingData() {
      const res = await fetch(`${URL}?query=${debouncedQuery}&apiKey=${API_KEY}`);
      const data = await res.json();
      setFoodData(data.results);
    }
    FetchingData();
  }, [debouncedQuery]);

  return (
    <div className={styles.inputCont}>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
}
