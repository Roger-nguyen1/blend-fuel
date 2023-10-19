import styles from "../styles/Home.module.css";
import { useState } from "react";
import { searchCity } from "../modules/searchCity";
import { searchCoordinates } from "../modules/searchCoordinates";
import Station from "../components/Station";
import NavBar from "../components/NavBar";

function Home() {
  const [inputSearch, setInputSearch] = useState("");
  const [stationsData, setStationsData] = useState(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const result = searchCity(inputSearch);
      console.log("Touche Entrée pressée");
      if (result) {
        setStationsData(result);
        console.log(stationsData);
      }
    }
  };

  //mise à jour des stations avec stationsData.map
  const stations = stationsData.map((data, i) => {
    return (
      <Station
        key={i}
        updateLikedMovies={updateLikedMovies}
        isLiked={isLiked}
        title={data.title}
        overview={tronquerTexte(data.overview, 250)}
        poster={`${posterUrl}${data.poster_path}`}
        voteAverage={data.vote_average}
        voteCount={data.vote_count}
      />
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

          <p>du texte PAS ICI</p>
          <button className="btn btn-accent">Rechercher</button>
        </div>
        {/* <div>{stations}</div> */}
      </main>
    </div>
  );
}

export default Home;
