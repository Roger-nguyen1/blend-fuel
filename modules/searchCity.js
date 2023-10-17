export function searchCity(city) {
  const apiCarburant = "https://api.prix-carburants.2aaz.fr/stations/?q=";
  let newDatas;
  let newDatasWithPrice;

  //Fonction de recherche des prix Fuels par station.id
  async function fetchStationDataById(stationId) {
    const apiUrl = `https://api.prix-carburants.2aaz.fr/station/${stationId}`;
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return null;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de la station : ",
        error
      );
      return null;
    }
  }

  //Récupération des données de la station par son id et ajout des prix Fuels aux données
  async function enrichDataWithFuelPrices() {
    for (const station of newDatas) {
      const stationData = await fetchStationDataById(station.id);
      if (stationData) {
        newDatasWithPrice.push({
          id: station.id,
          Brand: {
            name: station.Brand.name,
          },
          Address: station.Address,
          Coordinates: station.Coordinates,
          Prices: stationData.Fuels, // Ajout des prix des carburants
        });
      }
    }
  }

  //Recherche de la station et création nouveau tableaux d'objets
  if (city) {
    fetch(apiCarburant + city)
      .then((response) => response.json())
      .then((data) => {
        newDatas = data.map((item) => ({
          id: item.id,
          name: item.name,
          Brand: {
            name: item.Brand.name,
          },
          Address: item.Address,
          Coordinates: item.Coordinates,
        }));
        console.log(newDatas);
      })
      .catch((error) => console.error("Erreur:", error));

    console.log(newDatasWithPrice);
  }

  // enrichDataWithFuelPrices();
  return newDatasWithPrice;
}
