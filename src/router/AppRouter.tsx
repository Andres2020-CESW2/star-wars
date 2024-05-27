import { Route, Routes } from "react-router";
import { MyAlbum } from "../views/MyAlbum";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MyAlbum />}></Route>
    </Routes>
  );
};
