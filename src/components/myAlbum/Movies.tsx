import { useEffect, useState } from "react";
import { DataLaminates } from "../../models/DataModel";
import { useLocalStorage } from "../../services/useLocalStorage";
import "../../styles/main.css";

export const Movies = () => {
  const { getData } = useLocalStorage("Movies");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getData()) return setLoading(false);
    try {
      fetch("https://swapi.dev/api/films")
        .then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem(
            'Movies',
            JSON.stringify(
              Array.from({ length: data.count }, (_, i) => ({ id: i + 1, page: 0, category: 'Especial', type: 'Movies', isEmpty: true}))
            )
          );
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <div className="container z-1 position-relative">
      <h2 className="text-warning">Movies</h2>
      <div className="d-flex justify-content-center">
        {loading && (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <div className="container-cards">
        {(getData() as DataLaminates[])?.map((item, index) => (
          <div
            key={index}
            className="card col-md-4 v my-2"
            style={{ width: "18rem" }}
          >
            <div className="card-body">
            {item.name ? (
                  <h5 className="card-title">{item.category}</h5>
                ) : undefined}
                {item.name ? (
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {item.name}
                  </h6>
                ) : undefined}
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {item.id}
                </h6>
              {item.name ? (
                <a href="#" className="card-link">
                  Ver detalles
                </a>
              ) : undefined}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
