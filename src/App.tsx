import { AppContext } from "./context/AppContext";
import { useEffect, useState } from "react";
import { DataLaminates, Packets } from "./models/DataModel";
import { NavBar } from "./shared/NavBar";
import { Outlet } from "react-router";

export const App = () => {
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
    <AppContext.Provider
      value={{
        counter,
        setCounter,
        currentLaminates,
        setCurrentLaminates,
        packets,
        setPackets,
      }}
    >
      <NavBar />
      {counter > 0 && (
        <div className="text-black text-center">Contador: {counter}</div>
      )}
      <div className="background-image">
        <Outlet />
      </div>
    </AppContext.Provider>
  );
};
