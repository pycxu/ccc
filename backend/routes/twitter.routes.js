const express = require('express');
const router = express.Router();
const twitter = require('../models/twitter.model');

router.get('/', (req, res) => {
    res.json({message: 'ok'});
});

// Get average sentiment score
router.get('/adelaide',  async (req, res) => {
    await twitter
        .getAveScore('adelaide', 'newDoc', 'newView')
        .then(score => res.json(score))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
});

router.get('/sydney',  async (req, res) => {
    await twitter
        .getAveScore('sydney', 'newDoc', 'newView')
        .then(score => res.json(score))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
});

router.get('/brisbane',  async (req, res) => {
    await twitter
        .getAveScore('brisbane', 'newDoc', 'newView')
        .then(score => res.json(score))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
});

router.get('/melbourne',  async (req, res) => {
    await twitter
        .getAveScore('melbourne', 'newDoc', 'newView')
        .then(score => res.json(score))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
});

router.get('/perth',  async (req, res) => {
    await twitter
        .getAveScore('perth', 'newDoc', 'newView')
        .then(score => res.json(score))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
});

// Routes
module.exports = router;