// Budget API

const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));


const mongoose = require('mongoose');
const Budget =  require('./models/budget_schema')
let url = 'mongodb://127.0.0.1:27017/mydb';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => (
        console.log("Connected")
    )
).catch(
    (connectionError) => console.log("Error while connecting to db", connectionError)
    );

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    Budget.find({}, (err, data) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ error: 'Error querying the database' });
        } else {
            res.json(data);
        }
    });
});

app.get('/getD3Data', (req, res) => {
    Budget.find({}, (err, data) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ error: 'Error querying the database' });
        } else {
            res.json(data);
        }
    });
});

app.use(express.json());       
app.use(express.urlencoded());
app.post('/addBudgetItem', (req, res) => {

    // Get the data from the request body
    const { title, budget, color } = req.body;

    // Create a new budget item using the Mongoose model
    const newBudgetItem = new Budget({
        title,
        budget,
        color,
    });

    // Save the new item to the database
    newBudgetItem.save((err, savedItem) => {
        if (err) {
            console.error('Error saving budget item:', err);
            res.status(500).json({ error: 'Error saving budget item' });
        } else {
            console.log('Budget item saved:', savedItem);
            res.status(201).json({"success": "true","data": savedItem}); // Respond with the saved item
        }
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});