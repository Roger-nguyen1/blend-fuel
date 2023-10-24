import styles from "../styles/Home.module.css";
import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";
import { blendAndSort } from "../modules/blendAndSort";
import { searchCity } from "../modules/searchCity";
import { searchCoordinates } from "../modules/searchCoordinates";
import { Modal } from "antd";
import Station from "../components/Station";
import NavBar from "../components/NavBar";

function Home() {
  const [inputSearch, setInputSearch] = useState("");
  const [stationsData, setStationsData] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [rangeSp95, setRangeSp95] = useState(0);
  const [rangeSp98, setRangeSp98] = useState(0);
  const [rangeE85, setRangeE85] = useState(0);
  const [threeFuelsData, setThreeFuelsData] = useState(null);

  useEffect(() => {
    // Cette fonction sera appelée chaque fois que stationsData change
    //console.log("StationsData a changé :", stationsData);
    //console.log("Etat de isLoading : " + isLoading);
    setTimeout(() => {
      setInputSearch(""); // Efface le contenu de l'input
    }, 500);
  }, [stationsData]);

  useEffect(() => {
    const quantities = {
      e85: rangeE85, // Quantité de E85 en litres
      sp95E10: rangeSp95, // Quantité de SP95-E10 en litres
      sp98: rangeSp98, // Quantité de SP98 en litres
    };
    setThreeFuelsData(quantities);
  }, [rangeE85, rangeSp95, rangeSp98]);

  useEffect(() => {
    if (latitude && longitude) {
      fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
        .then((response) => response.json())
        .then((data) => {
          const geoCity = data.address.city;
          geoCity && setCity(geoCity);
        });
    }
  }, [latitude, longitude]);

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (rangeE85 === 0 && inputSearch) {
        showModal();

        setInputSearch("");
      } else if (rangeE85 >= 1) {
        setIsLoading(true); // Affiche un message de chargement
        const result = await searchCity(inputSearch);
        console.log("Touche Entrée pressée avec la valeur " + inputSearch);
        //console.log(result);
        if (result) {
          const stationsSorted = await blendAndSort(result, threeFuelsData);
          console.log(stationsSorted);
          setStationsData(result);
          stationsData && setIsLoading(false);
        }
      }
    }
  };

  const showModal = () => {
    setModalOn(true);
  };

  //mise à jour des stations avec stationsData.map
  let stations;
  stations = stationsData.map((data, i) => {
    return (
      <Station
        key={i}
        brand={data.Brand}
        fuels={data.Fuels}
        name={data.name}
        price={data.totalPrice}
      />
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
          <div>
            <h1>Coordonnées GPS</h1>
            <button className="btn btn-accent" onClick={handleGetLocation}>
              Récupérer les coordonnées
            </button>
            <p>Latitude : {latitude}</p>
            <p>Longitude : {longitude}</p>
            <p>Ville : {city}</p>
          </div>
          <button className="btn btn-accent">Rechercher</button>
        </div>
        <div>
          <p>___________________________________________</p>
          <p>Choisissez la quantité de carburants* : </p>
          <label>SP95-E10 : {rangeSp95} L</label>
          <input
            type="range"
            min={0}
            max="45"
            onChange={(e) => setRangeSp95(e.target.value)}
            value={rangeSp95}
            className="range"
          />
          <label>SP98: {rangeSp98} L</label>
          <input
            type="range"
            min={0}
            max="45"
            onChange={(e) => setRangeSp98(e.target.value)}
            value={rangeSp98}
            className="range range-success"
          />
          <label>E85: {rangeE85} L</label>
          <input
            type="range"
            min={0}
            max="45"
            onChange={(e) => {
              setRangeE85(e.target.value);
              console.log(e.target.value);
            }}
            value={rangeE85}
            className="range range-info"
          />
        </div>
        {isLoading ? (
          <div>
            <p>Chargement en cours...</p>
            <span className="loading loading-bars loading-md"></span>
          </div>
        ) : (
          <div>{stations}</div>
        )}
        <div>
          <Modal
            title="Hello!"
            onCancel={() => setModalOn(false)}
            open={modalOn}
            footer={null}
          >
            <h1>La quantité de carburant E85 ne peut être à 0 litre.</h1>
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default Home;
