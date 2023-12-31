import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";
import { mixSearchCity } from "../modules/mixSearchCity";
import { mixSearchCoordinates } from "../modules/mixSearchCoordinates";
import { codePostalSearch } from "../modules/codePostalSearch";
import Footer from "../components/Footer";
import { Modal } from "antd";

//import { Modal } from "react-daisyui";
import Station from "../components/Station";

//import MyModal from "./Modal";

function MixFuels() {
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
          searchWithCoordinates = await mixSearchCoordinates(
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

  const searchStations = async () => {
    if (rangeE85 === 0 && inputSearch) {
      showModal();

      setInputSearch("");
    } else if (rangeE85 >= 1) {
      setIsLoading(true); // Affiche un message de chargement
      setCity("");
      //Lance la recherche de stations avec le module searchCity
      const searchCityResult = await mixSearchCity(inputSearch, threeFuelsData);

      if (searchCityResult.length === 0) {
        console.log(
          "Aucuns résultats ; result = [] ; Lancement de la recherche par code postal"
        );
        const postCode = await codePostalSearch(inputSearch);
        const newResult = await mixSearchCity(postCode, threeFuelsData);
        setStationsData(newResult);
        stationsData && setIsLoading(false);
      } else {
        setStationsData(searchCityResult);
        stationsData && setIsLoading(false);
      }
    }
  };

  const handleSearch = () => {
    searchStations();
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      searchStations();
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

  //className="flex flex-col items-center justify-center"
  return (
    <div data-theme="night">
      <main className="font-nunito flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center mt-6">
          Recherche avec mélange de carburant E85
        </h1>
        <div className="my-2 flex flex-col items-center justify-center">
          <p className="text-lg mb-2.5">
            Choisissez la quantité de carburants* :{" "}
          </p>
          <label className="mx-2.5">SP95-E10 : {rangeSp95} L</label>
          <input
            type="range"
            min={0}
            max="45"
            onChange={(e) => setRangeSp95(e.target.value)}
            value={rangeSp95}
            className="mb-2 range"
          />
          <label className="mx-2.5">SP98: {rangeSp98} L</label>
          <input
            type="range"
            min={0}
            max="45"
            onChange={(e) => setRangeSp98(e.target.value)}
            value={rangeSp98}
            className="mb-2 range range-success"
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
            className="mb-2 range range-info"
          />
        </div>
        <div className="my-2 flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Rechercher une station par ville"
            className="m-3 input input-bordered input-info w-full max-w-xs"
            id="inputSearch"
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
            onKeyDown={handleKeyPress}
          />

          <button
            className="mb-2 btn bg-indigo-600 hover:bg-indigo-800"
            onClick={handleSearch}
          >
            Rechercher
          </button>
          <button
            className="mb-2 btn bg-indigo-600 hover:bg-indigo-800"
            onClick={handleGetLocation}
          >
            📍Recherche par géolocalisation
          </button>

          {/* <p>Coordonnées GPS</p>
          <p>Latitude : {latitude}</p>
          <p>Longitude : {longitude}</p> */}
          {city && <p>Ville : {city}</p>}
        </div>

        {isLoading ? (
          <div className="my-2 flex flex-col items-center justify-center">
            <p className="mb-2.5">Chargement en cours...</p>
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div>{stations}</div>
        )}
        <Footer />
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

export default MixFuels;
