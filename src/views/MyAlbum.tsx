import { Characters } from "../components/myAlbum/Characters";
import { Movies } from "../components/myAlbum/Movies";
import { Ships } from "../components/myAlbum/Ships";

export const MyAlbum = () => {
  return (
    <div className="container">
      <div className="z-1 position-relative">
        <h6 className="text-danger">Instrucciones:</h6>
        <p className="text-white">
          El album se almacena en localStorage, si desean reiniciar el album se
          debe eliminar las variable del localStorage y refrescar la pagina! :D
        </p>
      </div>
      <Movies />
      <hr />
      <Characters />
      <hr />
      <Ships />
    </div>
  );
};
