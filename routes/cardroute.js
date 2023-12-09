const express = require('express');
const CardModel = require('../models/card');

const router = express.Router();

router.post('/create-card', async (req, res) => {
  try {
    const { name, description, color, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const result = await CardModel.create({
      name,
      description,
      color,
      userId,
    });

    res.json(result);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation Error', details: err.errors });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




  router.get('/cards/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return
    }

    await CardModel.find({ userId: id })
      .then(cards => {
        res.json(cards);
      })
      .catch(err => console.log(err));
  });




  router.put('/saveCardPositions/:cardId', async (req, res) => {
    try {
      const { cardId } = req.params;
      const { x, y } = req.body; 
      

      const card = await CardModel.findById(cardId);
  
      if (!card) {
        return;
      }
  
      card.x = x;
      card.y = y;
  
      await card.save();
  
      res.json(card);
    } catch (error) {
      console.error('Error updating card positions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });




  router.put('/card-edit/:id', async (req, res) => {
    const { id } = req.params;
    const { value, field } = req.body;

    if (!id) {
      return
    }
  
    try {
      const card = await CardModel.findById(id);
  
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
  
      card[field] = value;
      await card.save();
  
      res.json(card);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});




router.delete('/card-delete/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return
  }

  const card = await CardModel.findById(id)

  if (!card) {
    return
  }

  await card.deleteOne()

  res.json({message: 'delete successful'})
})


module.exports = router;