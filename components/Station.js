import React from "react";

function Station(props) {
  const fuelsData = props.fuels;

  return (
    <div className="border-2 m-2.5">
      <div>
        <p>Station : {props.brand}</p>
        <p>Nom : {props.name}</p>
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
      <p>{props.price}</p>
      <p>------------------------------</p>
    </div>
  );
}
export default Station;
