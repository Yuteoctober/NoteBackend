const express = require('express');
const VisitModel = require('../models/visit'); // Import your Mongoose model

const router = express.Router();

router.post('/createcount/', async (req, res) => {
    try {
        const { name, visit } = req.body;

        const create = await VisitModel.create({ name, visit });

        res.json(create);
        console.log(create);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/updatecount/:sitename', async (req, res) => {
    try {
        const { sitename } = req.params;
        const { num } = req.body; 

      
        const visitfound = await VisitModel.findOne({ name: sitename });

        if (!visitfound) return res.status(404).json({ error: 'Visit not found' });
        
        visitfound.visit = num;

        
        await visitfound.save();

        console.log(visitfound)

        res.json(visitfound);
    } catch (error) {
        console.error('Error updating visit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getcount/:sitename', async (req, res) => {
    try {
        const { sitename } = req.params;
        if (!sitename) return res.status(400).json({ error: 'Sitename parameter is missing' });
        console.log(sitename)

        const visit = await VisitModel.findOne({ name: sitename });
        if (!visit) return res.status(404).json({ error: 'Visit not found' });

        res.json(visit);
    } catch (error) {
        console.error('Error retrieving visit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
