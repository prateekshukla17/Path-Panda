require('dotenv').config();

const mongoose = require(mongoose);
const Schema = mongoose.Schema;
const Object_Id = mongoose.Types.Object_Id;

const Data = new Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  fare: { type: int, required: true },
});

const DataModel = mongoose.model('Data', Data);

module.exports = {
  DataModel: DataModel,
};
