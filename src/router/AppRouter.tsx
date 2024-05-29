import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { MyAlbum } from "../views/MyAlbum";
import { NavBar } from "../shared/NavBar";
import { GetLamites } from "../views/GetLamites";
import { useEffect, useState } from "react";
import { DataLaminates, Packets } from "../models/DataModel";

export const AppRouter = () => {
  const initialPackets = [
    { opened: false, allow: true },
    { opened: false, allow: true },
    { opened: false, allow: true },
    { opened: false, allow: true },
  ];
  const [counter, setCounter] = useState(0);
  const [currentLaminates, setCurrentLaminates] = useState<DataLaminates[]>([]);

  const [packets, setPackets] = useState<Packets[]>(initialPackets);

  useEffect(() => {
    if (currentLaminates.length === 0) {
      setCounter(0);
    }
  }, [currentLaminates]);

  useEffect(() => {
    const AllOpened = packets.every(
      (packet) => packet.opened === true && packet.allow === false
    );

    if (AllOpened) {
      setPackets(initialPackets);
    }
  }, [packets]);

  return (
    <Router>
      <div>
        <NavBar />
        {counter > 0 && (
          <div className="text-black text-center">Contador: {counter}</div>
        )}
        <div className="background-image">
          <Switch>
            <Route exact path="/album" component={MyAlbum} />
            <Route exact path="/getLaminates">
              <GetLamites
                setCounter={setCounter}
                currentLaminates={currentLaminates}
                setCurrentLaminates={setCurrentLaminates}
                packets={packets}
                setPackets={setPackets}
              />
            </Route>
            <Redirect to="/album" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
