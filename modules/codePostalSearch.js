export async function codePostalSearch(city) {
  const apiCodePostal = "https://api-adresse.data.gouv.fr/search/?q=";
  const type = "&type=municipality";
  let codePostal;

  const response = await fetch(apiCodePostal + city + type);
  const data = await response.json();

  codePostal = data.features[0].properties.postcode;

  return codePostal;
}
