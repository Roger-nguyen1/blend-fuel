const stationsArr = [
  {
    id: 13710001,
    Brand: {
      id: 1,
      name: "TotalEnergies",
      short_name: "total",
      nb_stations: 1614,
    },
    type: "R",
    name: "TOTAL FUVEAU",
    Address: {
      street_line: "CD6 ZAC SAINT CHARLES",
      city_line: "13710 Fuveau",
    },
    Coordinates: {
      latitude: "43.466",
      longitude: "5.606",
    },
    Hours: {
      automate_24_7: true,
      Days: [
        {
          day: 1,
          name: "Lundi",
          status: "open",
          TimeSlots: [
            {
              opening_time: "06:30:00",
              closing_time: "20:00:00",
            },
          ],
        },
        {
          day: 2,
          name: "Mardi",
          status: "open",
          TimeSlots: [
            {
              opening_time: "06:30:00",
              closing_time: "20:00:00",
            },
          ],
        },
        {
          day: 3,
          name: "Mercredi",
          status: "open",
          TimeSlots: [
            {
              opening_time: "06:30:00",
              closing_time: "20:00:00",
            },
          ],
        },
        {
          day: 4,
          name: "Jeudi",
          status: "open",
          TimeSlots: [
            {
              opening_time: "06:30:00",
              closing_time: "20:00:00",
            },
          ],
        },
        {
          day: 5,
          name: "Vendredi",
          status: "open",
          TimeSlots: [
            {
              opening_time: "06:30:00",
              closing_time: "20:00:00",
            },
          ],
        },
        {
          day: 6,
          name: "Samedi",
          status: "open",
          TimeSlots: [
            {
              opening_time: "06:30:00",
              closing_time: "13:00:00",
            },
          ],
        },
        {
          day: 7,
          name: "Dimanche",
          status: "closed",
        },
      ],
    },
    Services: [
      "Station de gonflage",
      "Piste poids lourds",
      "Lavage automatique",
      "Lavage manuel",
      "Vente de gaz domestique (Butane, Propane)",
      "Automate CB 24/24",
      "DAB (Distributeur automatique de billets)",
      "Location de véhicule",
      "Toilettes publiques",
      "Relais colis",
      "Boutique alimentaire",
      "Boutique non alimentaire",
      "Services réparation / entretien",
      "Wifi",
      "Carburant additivé",
      "Vente d'additifs carburants",
      "Vente de fioul domestique",
    ],
    Fuels: [
      {
        id: 1,
        name: "Gazole",
        short_name: "Gazole",
        picto: "B7",
        Update: {
          value: "2023-10-24T06:33:37Z",
          text: "24/10/2023 06:33:37",
        },
        available: true,
        Price: {
          value: 1.93,
          currency: "EUR",
          text: "1.93 €",
        },
      },
      {
        id: 3,
        name: "Super Ethanol E85",
        short_name: "E85",
        picto: "E85",
        Update: {
          value: "2023-10-24T06:33:38Z",
          text: "24/10/2023 06:33:38",
        },
        available: true,
        Price: {
          value: 1.039,
          currency: "EUR",
          text: "1.039 €",
        },
      },
      {
        id: 5,
        name: "Super Sans Plomb 95 E10",
        short_name: "SP95-E10",
        picto: "E10",
        Update: {
          value: "2023-10-24T06:33:38Z",
          text: "24/10/2023 06:33:38",
        },
        available: true,
        Price: {
          value: 1.858,
          currency: "EUR",
          text: "1.858 €",
        },
      },
      {
        id: 6,
        name: "Super Sans Plomb 98",
        short_name: "SP98",
        picto: "E5",
        Update: {
          value: "2023-10-24T06:33:38Z",
          text: "24/10/2023 06:33:38",
        },
        available: true,
        Price: {
          value: 1.968,
          currency: "EUR",
          text: "1.968 €",
        },
      },
      {
        id: 4,
        name: "GPLc",
        short_name: "GPLc",
        picto: "LPG",
        Update: {
          value: "2023-10-24T06:33:38Z",
          text: "24/10/2023 06:33:38",
        },
        available: true,
        Price: {
          value: 0.88,
          currency: "EUR",
          text: "0.88 €",
        },
      },
    ],
    LastUpdate: {
      value: "2023-10-24T06:33:38Z",
      text: "24/10/2023 06:33:38",
    },
  },
  {
    id: 13710002,
    Brand: {
      id: 49,
      name: "Esso Express",
      short_name: "essoexpress",
      nb_stations: 322,
    },
    type: "R",
    name: "ESSO 4 CHEMINS",
    Address: {
      street_line: "RN 96 LES 4 CHEMINS LA BARQUE",
      city_line: "13710 Fuveau",
    },
    Coordinates: {
      latitude: "43.478412946922",
      longitude: "5.5376663126613",
    },
    Hours: {
      automate_24_7: false,
      Days: [],
    },
    Services: [],
    Fuels: [
      {
        id: 1,
        name: "Gazole",
        short_name: "Gazole",
        picto: "B7",
        Update: {
          value: "2023-10-23T05:31:00Z",
          text: "23/10/2023 05:31:00",
        },
        available: true,
        Price: {
          value: 1.876,
          currency: "EUR",
          text: "1.876 €",
        },
      },
      {
        id: 3,
        name: "Super Ethanol E85",
        short_name: "E85",
        picto: "E85",
        Update: {
          value: "2023-10-23T05:31:00Z",
          text: "23/10/2023 05:31:00",
        },
        available: true,
        Price: {
          value: 1.109,
          currency: "EUR",
          text: "1.109 €",
        },
      },
      {
        id: 5,
        name: "Super Sans Plomb 95 E10",
        short_name: "SP95-E10",
        picto: "E10",
        Update: {
          value: "2023-10-23T05:31:00Z",
          text: "23/10/2023 05:31:00",
        },
        available: true,
        Price: {
          value: 1.868,
          currency: "EUR",
          text: "1.868 €",
        },
      },
      {
        id: 6,
        name: "Super Sans Plomb 98",
        short_name: "SP98",
        picto: "E5",
        Update: {
          value: "2023-10-23T05:31:00Z",
          text: "23/10/2023 05:31:00",
        },
        available: true,
        Price: {
          value: 1.948,
          currency: "EUR",
          text: "1.948 €",
        },
      },
    ],
    LastUpdate: {
      value: "2023-10-23T05:31:00Z",
      text: "23/10/2023 05:31:00",
    },
  },
  {
    id: 13710003,
    Brand: {
      id: 29,
      name: "Casino",
      short_name: "casino",
      nb_stations: 172,
    },
    type: "R",
    name: "CASINO SUPERMARCHE",
    Address: {
      street_line: "Lotissement Grand Vallat",
      city_line: "13710 Fuveau",
    },
    Coordinates: {
      latitude: "43.451668013708",
      longitude: "5.55591372243",
    },
    Hours: {
      automate_24_7: true,
      Days: [],
    },
    Services: [
      "Vente de gaz domestique (Butane, Propane)",
      "Automate CB 24/24",
      "DAB (Distributeur automatique de billets)",
    ],
    Fuels: [
      {
        id: 1,
        name: "Gazole",
        short_name: "Gazole",
        picto: "B7",
        Update: {
          value: "2023-10-17T08:10:17Z",
          text: "17/10/2023 08:10:17",
        },
        available: true,
        Price: {
          value: 1.999,
          currency: "EUR",
          text: "1.999 €",
        },
      },
      {
        id: 5,
        name: "Super Sans Plomb 95 E10",
        short_name: "SP95-E10",
        picto: "E10",
        Update: {
          value: "2023-10-17T08:10:17Z",
          text: "17/10/2023 08:10:17",
        },
        available: true,
        Price: {
          value: 1.959,
          currency: "EUR",
          text: "1.959 €",
        },
      },
    ],
    LastUpdate: {
      value: "2023-10-17T08:10:17Z",
      text: "17/10/2023 08:10:17",
    },
  },
];

const quantitiesEx = {
  e85: 13, // Quantité de E85 en litres
  sp95E10: 0, // Quantité de SP95-E10 en litres
  sp98: 26, // Quantité de SP98 en litres
};

function blendAndSort(stations, quantities) {
  const { e85, sp95E10, sp98 } = quantities;

  const sortedStations = stations
    .filter((station) => station.Fuels.some((fuel) => fuel.id === 3)) // Exclut les stations sans carburant E85
    .map((station) => {
      const sp95E10Fuel = station.Fuels.find((fuel) => fuel.id === 5);
      const e85Fuel = station.Fuels.find((fuel) => fuel.id === 3);
      const sp98Fuel = station.Fuels.find((fuel) => fuel.id === 6);

      const sp95E10Price = sp95E10Fuel ? sp95E10Fuel.Price.value : 0;
      const e85Price = e85Fuel ? e85Fuel.Price.value : 0;
      const sp98Price = sp98Fuel ? sp98Fuel.Price.value : 0;

      // Calculez le prix total pour le mélange de carburants
      const totalPrice =
        sp95E10 * sp95E10Price + e85 * e85Price + sp98 * sp98Price;

      return {
        ...station,
        totalPrice,
      };
    });

  // Triez les stations en fonction du prix total
  sortedStations.sort((a, b) => a.totalPrice - b.totalPrice);

  return sortedStations;
}

console.log(blendAndSort(stationsArr, quantitiesEx));
