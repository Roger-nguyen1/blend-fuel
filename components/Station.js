import React from "react";

function Station(props) {
  const fuelsData = props.fuels;

  const fuelsToDisplay = fuelsData.map((data, i) => {
    return (
      <div>
        <p>{data.name}</p>
        <p>{data.Price.value}€</p>
      </div>
    );
  });

  return (
    <div className="border-2">
      <div>
        <p>{props.brand}</p>
        <p>{props.name}</p>
      </div>
      <div>{fuelsToDisplay}</div>
    </div>
  );
}
export default Station;
