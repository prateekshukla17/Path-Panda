require('dotenv').config();

const getFare = async function (trainNo, from, to) {
  const url = `https://irctc1.p.rapidapi.com/api/v2/getFare?trainNo=${trainNo}&fromStationCode=${from}&toStationCode=${to}`;

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

    const apiResponse = await response.json();
    const simplifiedFareData = apiResponse.data.general.map((item) => ({
      classType: item.classType,
      fare: item.fare,
    }));

    return simplifiedFareData;
  } catch (e) {
    console.error('Error Fetching the data:', e.message);
  }
};

module.exports = {
  getFare: getFare,
};
