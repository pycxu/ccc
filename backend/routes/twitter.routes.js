const express = require('express');
const router = express.Router();
const twitter = require('../models/twitter.model');

router.get('/', (req, res) => {
    res.json({message: 'ok'});
});

// Get average sentiment score
router.get('/adelaide',  async (req, res) => {
    await twitter
        .getAveScore('adelaide', 'sentiment', 'ave_score')
        .then(score => res.json(score))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
});

router.get('/sydney',  async (req, res) => {
    await twitter
        .getAveScore('sydney', 'sentiment', 'ave_score')
        .then(score => res.json(score))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
});

router.get('/brisbane',  async (req, res) => {
    await twitter
        .getAveScore('brisbane', 'sentiment', 'ave_score')
        .then(score => res.json(score))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
});

router.get('/melbourne',  async (req, res) => {
    await twitter
        .getAveScore('melbourne', 'sentiment', 'ave_score')
        .then(score => res.json(score))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
});

router.get('/perth',  async (req, res) => {
    await twitter
        .getAveScore('perth', 'sentiment', 'ave_score')
        .then(score => res.json(score))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
});

router.post('/income_cities', async (req, res) => {
    console.log(req.body);
    await twitter
        .findQuery('income_cities', req.body)
        .then(response => res.json(response))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
})

router.post('/unemployment', async (req, res) => {
    console.log(req.body);
    await twitter
        .findQuery('unemployment', req.body)
        .then(response => res.json(response))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
})

router.post('/facility_num', async (req, res) => {
    console.log(req.body);
    await twitter
        .findQuery('facility_num', req.body)
        .then(response => res.json(response))
        .catch(err => res.json({statusCode: err.statusCode, error: err.error}))
})
// Routes
module.exports = router;