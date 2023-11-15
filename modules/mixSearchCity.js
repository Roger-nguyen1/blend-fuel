//SearchCity.js
import { blendAndSort } from "./blendAndSort";

let newDatasWithPrice;

export async function mixSearchCity(city, threeFuelsData) {
  const apiStations = "https://api.prix-carburants.2aaz.fr/stations/?q=";

  let fetchDatas = false;

  // Recherche des stations avec création d'un tableaux de stations
  const response = await fetch(
    apiStations + city + "&responseFields=Fuels,Price&Range=station=1-20"
  );
  const data = await response.json();

  if (data !== null) {
    newDatasWithPrice = data.map((station) => ({
      id: station.id,
      Brand: station.Brand.name,
      adress: station.Address.street_line,
      ville: station.Address.city_line,
      name: station.name,
      Fuels: station.Fuels,
    }));

    fetchDatas = true;
  } else {
    return "no datas";
  }

  // Fin du fetch
  //console.log("LOGS newDatasWithPrice ===> " + city);
  //console.log(newDatasWithPrice);

  const sortedStations = await blendAndSort(newDatasWithPrice, threeFuelsData);

  return sortedStations;
}
