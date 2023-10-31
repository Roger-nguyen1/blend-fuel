# blend-fuel

Web app pour trouver les stations essences les moins chères avec mélange e85 et super sans plomb

Site web API :
https://swagger.2aaz.fr/

Exemple de requêtes pour l'API :

https://api.prix-carburants.2aaz.fr/stations/?q=13710&responseFields=Fuels,Price&Range=station=1-20
=> après q=code postal ou nom de la ville
ajouter le code postal de la ville

https://api.prix-carburants.2aaz.fr/stations/around/43.45390988657988,5.560912480333622
=> après url.../around/latitude,longitude
ajouter la latitude et longitude sans espace

API de Geocodin Gratuite :
https://geocode.maps.co/

API pour rechercher code postal avec le nom de la ville :
https://api-adresse.data.gouv.fr/search/?q=la+destrousse&type=municipality
