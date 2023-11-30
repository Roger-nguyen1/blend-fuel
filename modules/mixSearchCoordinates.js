//mixSearchCoordinates.js
//Requête pour rechercher des stations par géolocalisation avec mélange carburant E85

import { blendAndSort } from "./blendAndSort";

let newDatasWithPrice;

export async function mixSearchCoordinates(lat, lon, threeFuelsData) {
  const apiCarburantAround =
    "https://api.prix-carburants.2aaz.fr/stations/around/";
  //
  let fetchDatas = false;

  // Recherche des stations avec création d'un tableaux de stations
  if (lat && lon) {
    let response = await fetch(
      apiCarburantAround +
        lat +
        "," +
        lon +
        "?responseFields=Fuels,Price&Range=station=1-10"
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
        distance: station.Distance.text,
      }));

      fetchDatas = true;

      // Limiter la boucle à Range: station=11-20
      if (totalStations > 10) {
        const headers = new Headers({
          Range: "station=11-20",
        });

        response = await fetch(
          apiCarburantAround + lat + "," + lon + "?responseFields=Fuels,Price",
          {
            method: "GET",
            headers: headers,
          }
        );

        const additionalData = await response.json();

        if (additionalData !== null) {
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
              distance: station.Distance.text,
            }))
          );
        }
      }
    } else {
      return "no datas";
    }
  }

  const sortedStations = await blendAndSort(newDatasWithPrice, threeFuelsData);

  return sortedStations;
}
