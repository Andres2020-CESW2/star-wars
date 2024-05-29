import { useEffect, useState } from "react";
import { ResultCharacter, ResultFilm } from "../models/DataModel";

export const useFetch = (url: string) => {
  const [data, setData] = useState<ResultFilm[] | ResultCharacter[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        setCount(data.count);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, count , loading };
}
