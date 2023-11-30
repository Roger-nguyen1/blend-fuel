let newDatasWithPrice;

export async function searchFuelByCity(city) {
  const apiStations = "https://api.prix-carburants.2aaz.fr/stations/?q=";
  let fetchDatas = false;

  // Recherche des stations avec création d'un tableau de stations
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
      Fuels: station.Fuels,
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
            Fuels: station.Fuels,
          }))
        );
      }
    }
  } else {
    return "no datas";
  }

  return newDatasWithPrice;
}

// let newDatasWithPrice;

// export async function searchFuelByCity(city) {
//   const apiStations = "https://api.prix-carburants.2aaz.fr/stations/?q=";

//   let fetchDatas = false;

//   // Recherche des stations avec création d'un tableaux de stations
//   const response = await fetch(
//     apiStations + city + "&responseFields=Fuels,Price&Range=station=1-20"
//   );

//   const dataHeaders = response.headers;
//   const contentRange = dataHeaders.get("content-range");
//   console.log(contentRange);

//   const data = await response.json();

//   if (data !== null) {
//     newDatasWithPrice = data.map((station) => ({
//       id: station.id,
//       Brand: station.Brand.name,
//       adress: station.Address.street_line,
//       ville: station.Address.city_line,
//       name: station.name,
//       Fuels: station.Fuels,
//     }));

//     fetchDatas = true;
//   } else {
//     return "no datas";
//   }

//   return newDatasWithPrice;
// }
