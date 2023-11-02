import React from "react";
import "tailwindcss/tailwind.css";

function Station(props) {
  const fuelsData = props.fuels;

  return (
    <div className="border-2 p-2 m-2.5 rounded-lg">
      <div>
        <div className="flex justify-between items-center">
          <p className="mx-2">Station : {props.brand}</p>
          {props.distance && <p className="mx-2">{props.distance}</p>}
        </div>
        <p className="mx-2">Nom : {props.name}</p>
        <p className="mx-2 text-xs">
          Addresse : {props.address} {props.ville}
        </p>
      </div>
      <div>
        {fuelsData.map((data, i) => (
          <div key={i} className="flex justify-between items-center">
            <p className="m-2">
              {data.name}
              <p className="text-xs/[8px] italic">
                Mis à jour le {data.Update.text}
              </p>
            </p>
            <p className="mx-2 text-lg">{data.Price.value}€</p>
          </div>
        ))}
      </div>
      <p className="mx-2 font-bold">
        Prix total du mélange :{" "}
        <span className="text-lg">{props.price.toFixed(3)}</span>
      </p>
    </div>
  );
}
export default Station;
