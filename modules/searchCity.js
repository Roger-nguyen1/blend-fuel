export function searchCity(city) {
  const apiCarburant = "https://api.prix-carburants.2aaz.fr/stations/?q=";
  if (city) {
    fetch(apiCarburant + city)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Erreur:", error));
  }
}
