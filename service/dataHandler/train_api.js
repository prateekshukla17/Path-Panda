require('dotenv').config();

const getTrains = async function (from, to, date) {
  const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${from}&toStationCode=NDLS${to}&dateOfJourney=${date}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.xrapid_apikey,
      'x-rapidapi-host': 'irctc1.p.rapidapi.com',
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const fetched_data = await response.json();
    const trains = fetched_data.data?.map((train) => ({
      train_name: train.train_name,
      train_number: train.train_number,
      from: train.from,
      to: train.to,
    }));

    return trains;
  } catch (e) {
    console.error('Error Fetching the data:', e.message);
  }
};

module.exports = {
  getTrains: getTrains,
};
