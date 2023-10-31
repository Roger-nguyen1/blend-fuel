//SearchCoordinates.js
import { blendAndSort } from "./blendAndSort";

let newDatasWithPrice;

export async function searchCoordinates(lat, lon, threeFuelsData) {
  const apiCarburantAround =
    "https://api.prix-carburants.2aaz.fr/stations/around/";
  //
  let fetchDatas = false;

  // Recherche des stations avec création d'un tableaux de stations
  const response = await fetch(
    apiCarburantAround +
      lat +
      "," +
      lon +
      "?responseFields=Fuels,Price&Range=station=1-10"
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

  const sortedStations = await blendAndSort(newDatasWithPrice, threeFuelsData);

  return sortedStations;
}
