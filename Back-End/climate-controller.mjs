import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import * as climates from './climate-model.mjs';

const PORT = process.env.PORT;
// const PORT =  3003;

const app = express();
app.use(express.json());

//using cors
app.use(cors());

// CREATE controller ******************************************
app.post ('/climates', (req,res) => { 
    climates.createCityClimate(
        req.body.city,
        req.body.state,
        req.body.result,
        // req.body.country,
        // req.body.Jan,
        // req.body.Feb,
        // req.body.Mar,
        // req.body.Apr,
        // req.body.May,
        // req.body.Jun,
        // req.body.Jul,
        // req.body.Aug,
        // req.body.Sep,
        // req.body.Oct,
        // req.body.Nov,
        // req.body.Dec 
        )
        .then(climate => {
            res.status(201).json(climate);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Creation of a document failed due to invalid syntax.' });
        });
});

// RETRIEVE controller ****************************************************
// GET climstes by ID
app.get('/climates/:_id', (req, res) => {
    const climateId = req.params._id;
    climates.findClimatesById(climateId)
        .then(climate => { 
            if (climate !== null) {
                res.json(climate);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });
});

// GET climates filtered by city or month
app.get('/climates', (req, res) => {
    let filter = {};

    // filter by city
    if(req.query.city !== undefined){
        filter = { city: req.query.city };
    }
     // filter by state/country
     if(req.query.city !== undefined){
        filter = { state: req.query.state };
    }

    // // filter by month: Jan
    // if(req.query.Jan !== undefined){
    //     filter = { Jan: req.query.Jan };
   
    // }
    //  // filter by month: Feb
    //  if(req.query.Feb !== undefined){
    //     filter = { Feb: req.query.Feb };
   
    // }
    //  // filter by month: Mar
    //  if(req.query.Mar !== undefined){
    //     filter = { Mar: req.query.Mar };
   
    // }
    //  // filter by month: Apr
    //  if(req.query.Apr !== undefined){
    //     filter = { Apr: req.query.Apr };
   
    // }
    //  // filter by month: May
    //  if(req.query.May !== undefined){
    //     filter = { May: req.query.May };
   
    // }
    //  // filter by month: Jun
    //  if(req.query.Jun !== undefined){
    //     filter = { Jun: req.query.Jun };
   
    // }
    //  // filter by month: Jul
    //  if(req.query.Jul !== undefined){
    //     filter = { Jul: req.query.Jul };
   
    // }
    //  // filter by month: Aug
    //  if(req.query.Aug !== undefined){
    //     filter = { Aug: req.query.Aug };
   
    // }
    //  // filter by month: Sep
    //  if(req.query.Sep !== undefined){
    //     filter = { Sep: req.query.Sep };
   
    // }
    //  // filter by month: Oct
    //  if(req.query.Oct !== undefined){
    //     filter = { Oct: req.query.Oct };
   
    // }
    //  // filter by month: Nov
    //  if(req.query.Nov !== undefined){
    //     filter = { Nov: req.query.Nov };
   
    // }
    //  // filter by month: Dec
    //  if(req.query.Dec !== undefined){
    //     filter = { Dec: req.query.Dec };
   
    // }
    climates.findClimates(filter, '', 0)
        .then(climates => {
            res.send(climates);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve documents failed' });
        });

});

// DELETE Controller ******************************
app.delete('/climates/:_id', (req, res) => {
    climates.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

// UPDATE controller ************************************
app.put('/climates/:_id', (req, res) => {
    climates.replaceCityClimate(
        req.params._id, 
        req.body.city,
        req.body.state,
        req.body.result,
        // req.body.country,
        // req.body.Jan,
        // req.body.Feb,
        // req.body.Mar,
        // req.body.Apr,
        // req.body.May,
        // req.body.Jun,
        // req.body.Jul,
        // req.body.Aug,
        // req.body.Sep,
        // req.body.Oct,
        // req.body.Nov,
        // req.body.Dec 
    )
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.status(200).json({ 
                _id: req.params._id, 
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                result: req.body.result
            //     Jan: req.body.Jan,
            //     Feb: req.body.Feb,
            //     Mar: req.body.Mar,
            //     Apr: req.body.Apr,
            //     May: req.body.May,
            //     Jun: req.body.Jun,
            //     Jul: req.body.Jul,
            //     Aug: req.body.Aug,
            //     Sep: req.body.Sep,
            //     Oct: req.body.Oct,
            //     Nov: req.body.Nov,
            //     Dec: req.body.Dec 
            })
        } else {
            res.status(404).json({ Error: 'Document not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request to update a document failed' });
    });
});

app.listen(PORT || 'https://git.heroku.com/fierce-badlands-48978.git', () => {
    console.log(`Server listening on port ${PORT}|| 'https://git.heroku.com/fierce-badlands-48978.git'...`);
});
