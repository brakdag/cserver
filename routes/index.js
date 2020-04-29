const express = require('express');
const router = express.Router();
const convert = require('../lib/convert')

router.get('/getlist', function (req, res) {
    convert.getlist(x=>res.send(x))
});

router.get('/', (req, res) => { res.render('index.ejs') })

module.exports = router