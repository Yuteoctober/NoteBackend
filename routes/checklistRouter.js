const express = require('express');
const CheckListModel = require('../models/checkList')

const router = express.Router();

router.post('/create-checklist', async (req, res) => {
  
    await CheckListModel.create({
      checklistName: req.body.checklistName,
      checklist1: req.body.checklist1,
      checklist2: req.body.checklist2,
      checklist3: req.body.checklist3,
      checklist4: req.body.checklist4,
      checklist5: req.body.checklist5,
      done1: req.body.done1,
      done2: req.body.done2,
      done3: req.body.done3,
      done4: req.body.done4,
      done5: req.body.done5,
      color: req.body.color,
      userId: req.body.userId
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err)
    });
});

  router.get('/checklists/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return
    }
    
    await CheckListModel.find({ userId: id })
      .then(checklists => {
        res.json(checklists);
      })
      .catch(err => console.log(err));
  });



  router.put('/saveChecklistPositions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { x, y } = req.body; 
  
      const checklist = await CheckListModel.findById(id);
  
      if (!checklist) {
        return;
      }
  
      checklist.x = x;
      checklist.y = y;
  
      await checklist.save();
  
      res.json(checklist);
    } catch (error) {
      console.error('Error updating card positions:');
    }
  });

  router.put('/isdone/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { isDone, number } = req.body;
  
      const checklist = await CheckListModel.findById(id);
  
      if (!checklist) {
        return
      }
  
      // Update the "done" field based on the Mongoose _id
      checklist[`done${number}`] = isDone;
  
      await checklist.save();
  
      res.status(200).json({ success: true, message: 'Checklist updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

      router.put('/checklist-edit/:id', async (req, res) => {
        const {id} = req.params
        const {value, field} = req.body
        const checklist = await CheckListModel.findById(id)

        checklist[field] = value
        
        await checklist.save()
        res.json(checklist)
      })


      router.delete('/checklist-delete/:id', async (req, res) => {
        const { id } = req.params

        if (!id) {
          return
        }

        const checklist = await CheckListModel.findById(id)

        if (!checklist) {
          return
        }
      
        await checklist.deleteOne()
        res.json({message: 'delete successful'})
      })

      router.put('/checklist-color-change/:id', async (req, res) => {
        const { id } = req.params
        const { color } = req.body
    
        try {
          if (!id) return;
    
          const checklist = await CheckListModel.findById(id)
    
          if (!checklist) return;
    
          checklist.color = color
    
          await checklist.save()
    
          res.json(checklist.color)
    
        } catch (err) {
          console.log(err)
          res.status(500).json({ error: 'Internal server error' });
        }   
      })


   


module.exports = router;