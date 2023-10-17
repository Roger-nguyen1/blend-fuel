export function searchCoordinates(coordinates) {
  const apiCarburant1 = "https://api.prix-carburants.2aaz.fr/stations/around/";
  //
  if (coordinates) {
    fetch(apiCarburant1 + coordinates)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Erreur:", error));
  }
}
