// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to Climate Data collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const cityClimateSchema = mongoose.Schema({
	city: { type: String, required: true },
    state: { type: String, required: true },
    result: { type: Object, required: true }
    // country: { type: String, required: true },
    // Jan: { type: Object, required: true },
    // Feb: { type: Object, required: true },
    // Mar: { type: Object, required: true },
    // Apr: { type: Object, required: true },
    // May: { type: Object, required: true },
    // Jun: { type: Object, required: true },
    // Jul: { type: Object, required: true },
    // Aug: { type: Object, required: true },
    // Sep: { type: Object, required: true },
    // Oct: { type: Object, required: true },
    // Nov: { type: Object, required: true },
    // Dec: { type: Object, required: true },
});

// Compile the model from the schema.
const CityClimate = mongoose.model("CityClimate", cityClimateSchema);

// CREATE model *****************************************
const createCityClimate = async (city, state, result ) => {
    const cityClimate = new CityClimate({ 
        city: city,
        state: state,
        result: result
        // country: country,
        // Jan: Jan,
        // Feb: Feb,
        // Mar: Mar,
        // Apr: Apr,
        // May: May,
        // Jun: Jun,
        // Jul: Jul,
        // Aug: Aug,
        // Sep: Sep,
        // Oct: Oct,
        // Nov: Nov,
        // Dec: Dec 
    });
    return cityClimate.save();
}

// RETRIEVE models *****************************************
// Retrieve based on a filter and return a promise.
const findClimates = async (filter) => {
    const query = CityClimate.find(filter);
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findClimatesById = async (_id) => {
    const query = CityClimate.findById(_id);
    return query.exec();
}

// DELETE model based on ID  *****************************************
const deleteById = async (_id) => {
    const result = await CityClimate.deleteOne({_id: _id});
    return result.deletedCount;
};

// REPLACE model *****************************************************
const replaceCityClimate = async (_id, city, state, country, Jan, Feb, Mar, Apr, May, Jun, Jul,
    Aug, Sep, Oct, Nov, Dec ) => {
    const result = await Exercise.replaceOne({_id: _id }, {
        city: city,
        state: state,
        country: country,
        Jan: Jan,
        Feb: Feb,
        Mar: Mar,
        Apr: Apr,
        May: May,
        Jun: Jun,
        Jul: Jul,
        Aug: Aug,
        Sep: Sep,
        Oct: Oct,
        Nov: Nov,
        Dec: Dec 
    });
    return result.modifiedCount;
}

// Export our variables for use in the controller file.
export { createCityClimate, findClimates, findClimatesById, replaceCityClimate, deleteById }