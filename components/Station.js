import React from "react";
import "tailwindcss/tailwind.css";

function Station(props) {
  const fuelsData = props.fuels;

  return (
    <div className="border-2 m-2.5">
      <div>
        <p>Station : {props.brand}</p>
        <p>Distance : {props.distance}</p>
        <p>Nom : {props.name}</p>
        <p>Addresse : {props.address}</p>
        <p>Ville : {props.ville}</p>
      </div>
      <div>
        {fuelsData.map((data, i) => (
          <div key={i}>
            <p>
              {data.name} || Mis à jour le {data.Update.text}
            </p>
            <p>{data.Price.value}€</p>
          </div>
        ))}
      </div>
      <p>Prix total du mélange : {props.price.toFixed(3)}</p>
      <p>--------------------------------------</p>
    </div>
  );
}
export default Station;
