const { getMinFare } = require('./dataHandler/GetsMinFare');
const { dataModel } = require('.../DataBase/RouteMaps.js');
require('dotenv').config();
const cities = {
  Kanpur: 'CNB',
  NewDelhi: 'NDLS',
  Lucknow: 'LKO',
  Agra: 'AGC',
  Ambala: 'UMB',
  Chandigarh: 'CDG',
};

const buildData = async function () {
  const cityNames = Object.keys(cities);

  for (const source of cityNames) {
    for (const destination of cityNames) {
      if (source === destination) continue;

      const sourceCode = cities[source];
      const destinationCode = cities[destination];

      try {
        const response = await getMinFare(sourceCode, destinationCode);
        //sample response bestTrain = { trainNo, trainName, from, to, fare };
        const FromCity = `${response.from}_Train`;
        const ToCity = `${response.to}_Train`;
        const fare = response.fare;

        const output = { FromCity, ToCity, fare };

        await dataModel.create(output);
        console.log(`Stored data to the DB`);
      } catch (err) {
        console.error(`Error Fetching/Storing fare to the database; ${err}`);
      }
    }
  }
};
