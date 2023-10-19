export async function searchCity(city) {
  const apiStations = "https://api.prix-carburants.2aaz.fr/stations/?q=";
  const apiById = `https://api.prix-carburants.2aaz.fr/station/`;
  let arrayOfId;
  let fetchId = false;
  const newDatasWithPrice = [];

  //Recherche des stations avec création d'un tableaux d'id, et recherche des prix des carburants
  await fetch(apiStations + city)
    .then((response) => response.json())
    .then((data) => {
      arrayOfId = data.map((item) => item.id);
      fetchId = data !== null;
      //console.log(newDatas);

      //Requêtes par id et créations des données des stations
      if (fetchId) {
        for (let i = 0; i < arrayOfId.length; i++) {
          fetch(apiById + arrayOfId[i])
            .then((response) => response.json())
            .then((data) => {
              const dataModified = {
                id: data.id,
                Brand: data.Brand.name,
                name: data.name,
                Fuels: data.Fuels,
              };
              //console.log(dataModified);
              newDatasWithPrice.push(dataModified);
              //console.log(newDatasWithPrice);
            });
        }
      }
    })
    .catch((error) => console.error("Erreur:", error));

  //console.log(newDatasWithPrice);

  return newDatasWithPrice;
}
