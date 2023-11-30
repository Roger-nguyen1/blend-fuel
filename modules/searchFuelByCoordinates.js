//searchFuelByCoordinates.js
//Requête pour rechercher des stations avec la géolocalisation

let newDatasWithPrice;

export async function searchFuelByCoordinates(lat, lon) {
  const apiCarburantAround =
    "https://api.prix-carburants.2aaz.fr/stations/around/";
  //
  let fetchDatas = false;

  // Recherche des stations avec création d'un tableau de stations
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
        Fuels: station.Fuels,
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
              Fuels: station.Fuels,
              distance: station.Distance.text,
            }))
          );
        }
      }
    } else {
      return "no datas";
    }
  }

  return newDatasWithPrice;
}
