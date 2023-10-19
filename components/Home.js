import styles from "../styles/Home.module.css";
import { useState } from "react";
import { searchCity } from "../modules/searchCity";
import { searchCoordinates } from "../modules/searchCoordinates";
import Station from "../components/Station";
import NavBar from "../components/NavBar";

function Home() {
  const [inputSearch, setInputSearch] = useState("");
  const [stationsData, setStationsData] = useState([]);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      const result = await searchCity(inputSearch);
      console.log("Touche Entrée pressée avec la valeur " + inputSearch);
      //console.log(result);

      setStationsData(result);
      setTimeout(() => {
        console.log(stationsData);
      }, 6000);
    }
  };

  //mise à jour des stations avec stationsData.map
  const stations = stationsData.map((data, i) => {
    return (
      <Station key={i} brand={data.Brand} fuels={data.Fuels} name={data.name} />
    );
  });

  return (
    <div data-theme="night">
      <NavBar />
      <main className="flex items-center justify-center">
        <h1>Welcome to Blend Fuel!</h1>
        <div>
          <input
            type="text"
            placeholder="Rechercher une station"
            className="input input-bordered input-info w-full max-w-xs"
            id="inputSearch"
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
            onKeyDown={handleKeyPress}
            required
          />
          <button className="btn btn-accent">Rechercher</button>
        </div>
        <div>{stations}</div>
      </main>
    </div>
  );
}

export default Home;
