import styles from "../styles/Home.module.css";
import { useState } from "react";
import { searchCity } from "../modules/searchCity";
import { searchCoordinates } from "../modules/searchCoordinates";
import NavBar from "../components/NavBar";

function Home() {
  const [inputSearch, setInputSearch] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // La touche "Entrée" a été pressée, vous pouvez exécuter votre fonction ici.
      // Par exemple, vous pouvez appeler une fonction de recherche ou effectuer une action souhaitée.
      console.log("Touche Entrée pressée");
    }
  };

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
          />

          <p>du texte PAS ICI</p>
          <button className="btn btn-accent">Rechercher</button>
        </div>
      </main>
    </div>
  );
}

export default Home;
