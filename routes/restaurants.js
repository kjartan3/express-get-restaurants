const express = require("express");
const router = express.Router();
const Restaurant = require('../models/index');
const { check, validationResult } = require('express-validator');

let restaurants = [];

router.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll({});
    res.json(restaurants);
})

router.get('/:id', async (req, res) => {
    const restaurants = await Restaurant.findByPk(req.params.id); // -1 ?
    res.json(restaurants);
    // res.json(restaurants[req.params.id - 1]);
})

router.post('/', [
    check('name').not().isEmpty().trim().withMessage('Name is required.'),
    check('location').not().isEmpty().trim().withMessage('Location is required.'),
    check('cuisine').not().isEmpty().trim().withMessage('Cuisine is required.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({error: errors.array()});
    } else {
        const { name, location, cuisine } = req.body;
        const newRestaurant = { name, location, cuisine };
        restaurants.push(newRestaurant);
        res.json(restaurants);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const restaurants = await Restaurant.findByPk(req.params.id);

        if (!restaurants) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        const updatedRestaurant = await restaurant.update(req.body);
        res.json(updatedRestaurant);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        await restaurant.destroy();
        res.json({ message: 'Restaurant deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;