import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";
import { searchCity } from "../modules/searchCity";
import { searchCoordinates } from "../modules/searchCoordinates";
import { codePostalSearch } from "../modules/codePostalSearch";
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
    console.log("StationsData a changé :", stationsData);
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

  const handleGetLocation = async () => {
    try {
      // Récupère la latitude et la longitude à partir du navigateur
      setIsLoading(true);
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      if (!rangeE85) {
        showModal();
        setIsLoading(false);
      } else if (rangeE85 >= 1) {
        // Effectue une recherche de stations avec les coordonnées récupérées
        let searchWithCoordinates;
        if (position.coords.latitude && position.coords.longitude) {
          searchWithCoordinates = await searchCoordinates(
            position.coords.latitude,
            position.coords.longitude,
            threeFuelsData
          );
          searchWithCoordinates && setStationsData(searchWithCoordinates);
        }
      }

      // Définit la valeur de `setIsLoading()` en fonction de la valeur de `stationsData`
      setIsLoading(stationsData ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (rangeE85 === 0 && inputSearch) {
        showModal();
        setInputSearch("");
      } else if (rangeE85 >= 1) {
        //console.log("Touche Entrée pressée avec la valeur : " + inputSearch);
        setIsLoading(true); // Affiche un message de chargement

        //Lance la recherche de stations avec le module searchCity
        const searchCityResult = await searchCity(inputSearch, threeFuelsData);

        //console.log(result);
        if (searchCityResult.length === 0) {
          console.log(
            "Aucuns résultats ; result = [] ; Lancement de la recherche par code postal"
          );
          const postCode = await codePostalSearch(inputSearch);
          const newResult = await searchCity(postCode, threeFuelsData);
          setStationsData(newResult);
          stationsData && setIsLoading(false);
        } else {
          setStationsData(searchCityResult);
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
  if (stationsData) {
    stations = stationsData.map((data, i) => {
      return (
        <Station
          key={i}
          brand={data.Brand}
          fuels={data.Fuels}
          name={data.name}
          price={data.totalPrice}
          address={data.adress}
          ville={data.ville}
          distance={data.distance}
        />
      );
    });
  }

  //
  return (
    <div data-theme="night">
      <NavBar />
      <main className="font-nunito flex flex-col items-center justify-center">
        <h1 className="text-4xl mt-6">Welcome to Blend Fuel!</h1>
        <div className="my-2 flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Rechercher une station"
            className="m-3 input input-bordered input-info w-full max-w-xs"
            id="inputSearch"
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
            onKeyDown={handleKeyPress}
          />

          <button className="m-2 btn btn-accent">Rechercher</button>
          <button className="m-2 btn btn-accent" onClick={handleGetLocation}>
            📍Recherche par géolocalisation
          </button>

          <p>Coordonnées GPS</p>
          <p>Latitude : {latitude}</p>
          <p>Longitude : {longitude}</p>
          <p>Ville : {city}</p>
        </div>
        <div className="my-2 flex flex-col items-center justify-center">
          <p className="mx-2.5">Choisissez la quantité de carburants* : </p>
          <label className="mx-2.5">SP95-E10 : {rangeSp95} L</label>
          <input
            type="range"
            min={0}
            max="45"
            onChange={(e) => setRangeSp95(e.target.value)}
            value={rangeSp95}
            className="mx-2.5 w-3/4 range"
          />
          <label className="mx-2.5">SP98: {rangeSp98} L</label>
          <input
            type="range"
            min={0}
            max="45"
            onChange={(e) => setRangeSp98(e.target.value)}
            value={rangeSp98}
            className="mx-2.5 w-3/4 range range-success"
          />
          <label className="mx-2.5">E85: {rangeE85} L</label>
          <input
            type="range"
            min={0}
            max="45"
            onChange={(e) => {
              setRangeE85(e.target.value);
            }}
            value={rangeE85}
            className="mx-2.5 w-3/4 range range-info"
          />
        </div>
        {isLoading ? (
          <div className="my-2 flex flex-col items-center justify-center">
            <p>Chargement en cours...</p>
            <span className="loading loading-bars loading-md"></span>
          </div>
        ) : (
          <div>{stations}</div>
        )}
        <div>
          <Modal
            title="Blend Fuel"
            onCancel={() => setModalOn(false)}
            open={modalOn}
            footer={null}
          >
            <h1>La quantité de carburant E85 ne peut être à 0 litre.</h1>
            <p>Renseignez une quantité de E85 supérieur à 0 litre.</p>
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default Home;
