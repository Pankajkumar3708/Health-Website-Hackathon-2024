const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});
app.get('/routine.json', (req, res) => {
    fs.readFile('routine.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/routine', (req, res) => {
    const { routineName } = req.body;
    fs.readFile('routine.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const routines = JSON.parse(data);
        const existingRoutine = routines.find(routine => routine.name === routineName);
        if (existingRoutine) {
            res.status(400).json({ error: 'Routine already exists' });
            return;
        }
        routines.push({ name: routineName, practices: [] });
        fs.writeFile('routine.json', JSON.stringify(routines, null, 2), err => {
            if (err) {
                console.error('Error writing to JSON file:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json({ message: "Routine created successfully" });
        });
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));