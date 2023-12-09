const express = require('express');
const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const router = express.Router();

/// CREATE USERS
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(username)

    try {
        const user = await UserModel.findOne({ username });

        if (user) {
            return res.json({ message: 'User already exists' });
        }
        if (!password) {
            return res.json({ message: 'Password is incorrect' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ username, password: hashedPassword });

        await newUser.save();

        return res.json({ message: 'User created' });
    } catch (error) {
        console.error('Error during registration:', error);
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = await UserModel.findOne({username})
    if(!user) {
        return res.json({message: "User not found"})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) {
        return res.json({message: 'wrong credentials'})
    }
    const token = jwt.sign({id: user._id}, 'secret')
    res.cookie('token', token, { 
        sameSite: 'none', 
        secure: true 
    });
    return res.json({message: 'sucessfully login', id: user._id})
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.json({message: 'logout sucessful'})
})

router.get('/username/:userId', (req, res) => {
    const { userId } = req.params;

    console.log(userId)
  
    UserModel.findById(userId)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  });

router.put('/avatar/:id', async (req, res) => {
    const {id} = req.params
    const {avatar} = req.body
    
    if (!id) {
        return;
    }

    const user = await UserModel.findById(id)

    if(!user) {
        return;
    }
    user.avatar = avatar
    await user.save()
        .then(result => res.json(result))
        .catch(err => console.log(err))
})



module.exports = router;