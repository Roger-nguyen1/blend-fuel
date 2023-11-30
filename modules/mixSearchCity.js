//mixSearchCity.js
//Requête pour rechercher des stations par ville ou code postal avec mélange carburant E85

import { blendAndSort } from "./blendAndSort";

let newDatasWithPrice;

export async function mixSearchCity(city, threeFuelsData) {
  const apiStations = "https://api.prix-carburants.2aaz.fr/stations/?q=";

  let fetchDatas = false;

  // Recherche des stations avec création d'un tableaux de stations
  let response = await fetch(
    apiStations + city + "&responseFields=Fuels,Price&Range=station=1-20"
  );

  const dataHeaders = response.headers;
  const contentRange = dataHeaders.get("content-range");

  const totalStations = parseInt(contentRange.split("/")[1], 10);

  const data = await response.json();

  if (data !== null) {
    newDatasWithPrice = data.map((station) => ({
      id: station.id,
      Brand: station.Brand.name,
      adress: station.Address.street_line,
      ville: station.Address.city_line,
      name: station.name,
      Fuels: station.Fuels.filter((fuel) => fuel.id !== 1 && fuel.id !== 4),
    }));

    fetchDatas = true;

    // Si le contenu de la plage est supérieur à 1-10/10, effectuer des requêtes supplémentaires
    if (totalStations > 10) {
      for (let i = 10; i < totalStations; i += 10) {
        const headers = new Headers({
          Range: `station=${i + 1}-${i + 10}`,
        });

        response = await fetch(
          apiStations + city + `&responseFields=Fuels,Price`,
          {
            method: "GET",
            headers: headers,
          }
        );

        const additionalData = await response.json();

        newDatasWithPrice = newDatasWithPrice.concat(
          additionalData.map((station) => ({
            id: station.id,
            Brand: station.Brand.name,
            adress: station.Address.street_line,
            ville: station.Address.city_line,
            name: station.name,
            Fuels: station.Fuels.filter(
              (fuel) => fuel.id !== 1 && fuel.id !== 4
            ),
          }))
        );
      }
    }
  } else {
    return "no datas";
  }

  // Fin du fetch
  // console.log("LOGS newDatasWithPrice ===> " + city);
  // console.log(newDatasWithPrice);

  const sortedStations = await blendAndSort(newDatasWithPrice, threeFuelsData);

  return sortedStations;
}
