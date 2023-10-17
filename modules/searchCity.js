export function searchCity(city) {
  const apiCarburant =
    "https://api.prix-carburants.2aaz.fr/stations/?opendata=v2&q=";
  if (city) {
    fetch(apiCarburant + city)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data = newDatas;
      })
      .catch((error) => console.error("Erreur:", error));
  }
}
