import { getTrains } from './train_api';
import { getFare } from './trainFare';

const { getTrains } = require('./train_api');
const { getFare } = require('./trainFare');
const getMinFare = async function (from, to) {
  const trains = await getTrains(from, to);

  let minFare = Infinity;
  let bestTrain = null;
  const response = [];

  for (const train of trains) {
    const trainNo = train['Train_No'];
    const trainName = train['Train Name'];
    const fare = await getFare(trainNo, from, to);

    if (fare < minFare) {
      minFare = fare;
      bestTrain = { trainNo, trainName, from, to, fare };
    }
  }

  return bestTrain ? [bestTrain] : [];
};

module.exports = {
  getMinFare: getMinFare,
};

//Sample bestTrain
//const besTrain = [
// {
//     1341,'ssampleTrain','CNB','NLDS','730'
// }
//]

//Sample Trains Data
// const trains = [
//   {
//     'Train Name': 'Sample_Name1',
//     'Train No': 12451,
//   },
//   { 'Train Name': 'Sample_Name2', 'Train No': 12411 },
//   { 'Train Name': 'Sample_Name1', 'Train No': 12651 },
//   { 'Train Name': 'Sample_Name1', 'Train No': 12751 },
// ];
