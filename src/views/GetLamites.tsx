import { DataLaminates } from "../models/DataModel";

export const GetLamites = ({
  setCounter,
  currentLaminates,
  setCurrentLaminates,
  packets,
  setPackets
}) => {

  const openPackets = (index: number) => {
    configConsultV1();
    setPackets(
      packets.map((item, i) =>
        i === index
          ? { allow: false, opened: true }
          : item.opened === true
          ? item
          : { allow: false, opened: false }
      )
    );
    setCounter(60);
    const interval = setInterval(() => {
      setCounter((prevContador: number) => {
        if (prevContador <= 1) {
          clearInterval(interval);
          setCurrentLaminates([]);
          setPackets(
            packets.map((item, i) =>
              i !== index ? item : { allow: false, opened: true }
            )
          );
          return 0;
        } else {
          return prevContador - 1;
        }
      });
    }, 1000);
  };

  const configConsultV1 = () => {
    // consulta films
    const dataFilm = window.localStorage.getItem("Movies");
    let filmsLocal: DataLaminates[] = [];
    if (dataFilm) {
      filmsLocal = JSON.parse(dataFilm);
    }
    if (filmsLocal) {
      const index = Math.floor(Math.random() * filmsLocal.length);
      const ID = filmsLocal[index].id;
      try {
        fetch(`https://swapi.dev/api/films/${ID}`)
          .then((response) => response.json())
          .then((data) => {
            setCurrentLaminates((prev) => [
              ...prev,
              {
                id: ID,
                name: data.title,
                category: filmsLocal[index].category,
                type: filmsLocal[index].type,
              },
            ]);
          });
      } catch (error) {
        console.log(error);
      }
    }
    // consulta characters
    const dataCharacters = window.localStorage.getItem("Characters");
    let charactersLocal: DataLaminates[] = [];
    if (dataCharacters) {
      charactersLocal = JSON.parse(dataCharacters);
    }
    if (charactersLocal) {
      for (let index = 0; index < 3; index++) {
        const index = Math.floor(Math.random() * charactersLocal.length);
        const ID = charactersLocal[index].id;
        try {
          fetch(`https://swapi.dev/api/people/${ID}`)
            .then((response) => response.json())
            .then((data) => {
              setCurrentLaminates((prev) => [
                ...prev,
                {
                  id: ID,
                  name: data.name,
                  category: charactersLocal[index].category,
                  type: charactersLocal[index].type,
                },
              ]);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
    // consulta ships
    const dataShips = window.localStorage.getItem("Ships");
    let ShipsLocal: DataLaminates[] = [];
    if (dataShips) {
      ShipsLocal = JSON.parse(dataShips);
    }
    if (ShipsLocal) {
      const index = Math.floor(Math.random() * ShipsLocal.length);
      const ID = ShipsLocal[index].id;
      try {
        fetch(`https://swapi.dev/api/starships/${ID}`)
          .then((response) => response.json())
          .then((data) => {
            setCurrentLaminates((prev) => [
              ...prev,
              {
                id: ID,
                name: data.name,
                category: ShipsLocal[index].category,
                type: ShipsLocal[index].type,
              },
            ]);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getLocalStorage = (key: string) => {
    try {
      const data = window.localStorage.getItem(key);
      let result: DataLaminates[] = [];
      if (data) {
        result = JSON.parse(data);
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const checkMatch = (id: number, type: string, name?: string) => {
    const arr = getLocalStorage(type);
    const index = arr?.findIndex(
      (laminate) => laminate.id === id && laminate.isEmpty === true
    );
    if (arr && index !== -1) {
      return (
        <a
          href="#"
          onClick={() => addLaminateToAlbum(id, type, name)}
          className="card-link"
        >
          Add
        </a>
      );
    } else {
      return (
        <a
          href="#"
          className="card-link"
          onClick={() => removeCurrentLaminates(id)}
        >
          Discard
        </a>
      );
    }
  };

  const removeCurrentLaminates = (id: number) => {
    setCurrentLaminates((prevLaminates) =>
      prevLaminates.filter((laminate) => laminate.id !== id)
    );
  };

  const addLaminateToAlbum = (id: number, type: string, name?: string) => {
    const arr = getLocalStorage(type);
    const index = arr?.findIndex((laminate) => laminate.id === id);
    const copyArr = arr;
    if (index) {
      if (copyArr && index !== -1) {
        copyArr[index].isEmpty = false;
        copyArr[index].name = name;
        localStorage.setItem(type, JSON.stringify(copyArr));
      }
    } else {
      if (copyArr) {
        copyArr[0].isEmpty = false;
        copyArr[0].name = name;
        localStorage.setItem(type, JSON.stringify(copyArr));
      }
    }
    removeCurrentLaminates(id);
  };

  return (
    <div className="wrapper-container z-1 position-relative vh-100">
      <div className="container d-flex justify-content-center gap-5">
        {packets.map((item, index) => (
          <div key={index} className="w-25 h-25">
            <button
              className="bg-light cursor-pointer h-100 w-100"
              onClick={() => openPackets(index)}
              disabled={!item.allow}
            >
              {item.opened ? <b>Abierto</b> : `Sobre ${index + 1}`}
            </button>
          </div>
        ))}
      </div>
      <div className="container wrappe-lamites">
        <h2 className="text-warning text-center mt-4">Open envelope laminates:</h2>

        <div className="wrapper-cards">
        <div className="container-cards">
          {currentLaminates?.map((item, i) => (
            <div
              key={i}
              className="card col-md-4 v my-2"
            >
              <div className="card-body">
                <h5 className="card-title">{item.category}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Name: {item.name}
                </h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  ID: {item.id}
                </h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Section: {item.type}
                </h6>
                {checkMatch(item.id, item.type, item.name)}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};
