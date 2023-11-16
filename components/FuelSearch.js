import React from "react";
import { useState, useEffect } from "react";
import { searchFuelByCity } from "../modules/searchFuelByCity";
import { codePostalSearch } from "../modules/codePostalSearch";
import FuelByPrice from "../components/FuelByPrice";

function FuelSearch() {
  const [inputSearch, setInputSearch] = useState("");
  const [city, setCity] = useState(null);
  const [stationsData, setStationsData] = useState([]);
  const [radioBoxFuel, setRadioBoxFuel] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const searchStations = async () => {
    setIsLoading(true); // Affiche un message de chargement
    //setCity("");
    //Lance la recherche de stations avec le module searchCity
    const searchCityResult = await searchFuelByCity(inputSearch);

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
  };

  const handleSearch = () => {
    searchStations();
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      searchStations();
    }
  };

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

  // ...

  let stations;
  if (stationsData) {
    stations = stationsData.map((data, i) => {
      // Filtrer les carburants en fonction de la radioBoxFuel
      const filteredFuels = data.Fuels.filter((fuel) => {
        switch (radioBoxFuel) {
          case "gazole":
            return fuel.id === 1;
          case "sp95":
            return fuel.id === 2;
          case "e85":
            return fuel.id === 3;
          case "gpl":
            return fuel.id === 4;
          case "sp95-e10":
            return fuel.id === 5;
          case "sp98":
            return fuel.id === 6;
          default:
            return true; // Si aucune radioBoxFuel sélectionnée, afficher tous les carburants
        }
      });

      // Afficher le composant uniquement si au moins un carburant est trouvé
      if (filteredFuels.length > 0) {
        return (
          <FuelByPrice
            key={i}
            brand={data.Brand}
            fuels={filteredFuels}
            name={data.name}
            price={data.totalPrice}
            address={data.adress}
            ville={data.ville}
            distance={data.distance}
          />
        );
      } else {
        return null; // Aucun carburant correspondant à la sélection
      }
    });
  }

  // ...

  return (
    <div data-theme="night">
      <main className="font-nunito flex flex-col items-center justify-center">
        <h1 className="text-4xl mt-6">
          Recherche par carburant...en cours de développement
        </h1>
        <p className="text-lg mt-2.5">Sélectionnez votre carburant</p>
        <div className="flex mt-2.5">
          <div>
            <label>
              <input
                className="mr-1"
                type="radio"
                name="fuelFilter"
                value="e85"
                onChange={(e) => setRadioBoxFuel(e.target.value)}
              />
              E85
            </label>
          </div>

          <div className="ml-2">
            <label>
              <input
                className="mr-1"
                type="radio"
                name="fuelFilter"
                value="sp95"
                onChange={(e) => setRadioBoxFuel(e.target.value)}
              />
              SP95
            </label>
          </div>
          <div className="ml-2">
            <label>
              <input
                className="mr-1"
                type="radio"
                name="fuelFilter"
                value="sp95-e10"
                onChange={(e) => setRadioBoxFuel(e.target.value)}
              />
              SP95-E10
            </label>
          </div>
          <div className="ml-2">
            <label>
              <input
                className="mr-1"
                type="radio"
                name="fuelFilter"
                value="sp98"
                onChange={(e) => setRadioBoxFuel(e.target.value)}
              />
              SP98
            </label>
          </div>
        </div>
        <div className="flex">
          <div>
            <label>
              <input
                className="mr-1"
                type="radio"
                name="fuelFilter"
                value="gazole"
                onChange={(e) => setRadioBoxFuel(e.target.value)}
              />
              Gazole
            </label>
          </div>
          <div className="ml-2">
            <label>
              <input
                className="mr-1"
                type="radio"
                name="fuelFilter"
                value="gpl"
                onChange={(e) => setRadioBoxFuel(e.target.value)}
              />
              GPL
            </label>
          </div>
        </div>
        <div className="mb-2 flex flex-col items-center justify-center">
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
        {/* <div>
          <Modal
            title="Blend Fuel"
            onCancel={() => setModalOn(false)}
            open={modalOn}
            footer={null}
          >
            <h1>La quantité de carburant E85 ne peut être à 0 litre.</h1>
            <p>Renseignez une quantité de E85 supérieur à 0 litre.</p>
          </Modal>
        </div> */}
      </main>
    </div>
  );
}

export default FuelSearch;
