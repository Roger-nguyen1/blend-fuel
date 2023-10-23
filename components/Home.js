//import styles from "../styles/Home.module.css";
import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";
import { searchCity } from "../modules/searchCity";
import { searchCoordinates } from "../modules/searchCoordinates";
import Station from "../components/Station";
import NavBar from "../components/NavBar";

function Home() {
  const [inputSearch, setInputSearch] = useState("");
  const [stationsData, setStationsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rangeSp95, setRangeSp95] = useState(0);
  const [rangeSp98, setRangeSp98] = useState(0);
  const [rangeE85, setRangeE85] = useState(0);

  useEffect(() => {
    // Cette fonction sera appelée chaque fois que stationsData change
    //console.log("StationsData a changé :", stationsData);
    //console.log("Etat de isLoading : " + isLoading);
    setTimeout(() => {
      setInputSearch(""); // Efface le contenu de l'input
    }, 500);
  }, [stationsData]);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      setIsLoading(true); // Affiche un message de chargement
      const result = await searchCity(inputSearch);
      console.log("Touche Entrée pressée avec la valeur " + inputSearch);
      //console.log(result);
      if (result) {
        setStationsData(result);
        stationsData && setIsLoading(false);
      }
    }
  };

  //mise à jour des stations avec stationsData.map
  let stations;
  stations = stationsData.map((data, i) => {
    return (
      <Station key={i} brand={data.Brand} fuels={data.Fuels} name={data.name} />
    );
  });

  //
  return (
    <div data-theme="night">
      <NavBar />
      <main className="flex items-center justify-center">
        <h1 className="text-4xl">Welcome to Blend Fuel!</h1>
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
        <div>
          <label for="sp95">SP95 : {rangeSp95} L</label>
          <input
            type="range"
            min={0}
            max="100"
            onChange={(e) => setRangeSp95(e.target.value)}
            value={rangeSp95}
            className="range"
          />
          <label for="sp98">SP98: {rangeSp98} L</label>
          <input
            type="range"
            min={0}
            max="100"
            onChange={(e) => setRangeSp98(e.target.value)}
            value={rangeSp98}
            className="range range-success"
          />
          <label for="E85">E85: {rangeE85} L</label>
          <input
            type="range"
            min={0}
            max="100"
            onChange={(e) => setRangeE85(e.target.value)}
            value={rangeE85}
            className="range range-info"
          />
        </div>
        {isLoading ? (
          <div>
            <span className="loading loading-bars loading-md"></span>
          </div>
        ) : (
          <div>{stations}</div>
        )}
      </main>
    </div>
  );
}

export default Home;
