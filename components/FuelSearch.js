import React from "react";
import { useState, useEffect } from "react";
import { searchFuelByCity } from "../modules/searchFuelByCity";
import { codePostalSearch } from "../modules/codePostalSearch";
import FuelByPrice from "../components/FuelByPrice";

function FuelSearch() {
  const [inputSearch, setInputSearch] = useState("");
  const [city, setCity] = useState(null);
  const [stationsData, setStationsData] = useState([]);
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

  let stations;
  if (stationsData) {
    stations = stationsData.map((data, i) => {
      return (
        <FuelByPrice
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

  return (
    <div data-theme="night">
      <main className="font-nunito flex flex-col items-center justify-center">
        <h1 className="text-4xl mt-6">
          Recherche par carburant...en cours de développement
        </h1>

        <div className="my-2 flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Rechercher une station par ville"
            className="m-3 input input-bordered input-info w-full max-w-xs"
            id="inputSearch"
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
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
