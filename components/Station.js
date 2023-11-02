import React from "react";
import "tailwindcss/tailwind.css";

function Station(props) {
  const fuelsData = props.fuels;

  return (
    <div className="border-2 p-2 m-2.5 rounded-lg">
      <div>
        <p className="mx-2">Station : {props.brand}</p>
        {props.distance && <p className="mx-2">Distance : {props.distance}</p>}
        <p className="mx-2">Nom : {props.name}</p>
        <p className="mx-2">Addresse : {props.address}</p>
        <p className="mx-2">Ville : {props.ville}</p>
      </div>
      <div>
        {fuelsData.map((data, i) => (
          <div key={i}>
            <p className="mx-2">
              {data.name} || Mis à jour le {data.Update.text}
            </p>
            <p className="mx-2">{data.Price.value}€</p>
          </div>
        ))}
      </div>
      <p className="mx-2">Prix total du mélange : {props.price.toFixed(3)}</p>
    </div>
  );
}
export default Station;
