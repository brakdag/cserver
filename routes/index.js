const express = require('express');
const router = express.Router();

router.get('/getlist', function (req, res) {
    res.send("");
});

router.get('/', (req, res) => { res.render('index.ejs') })

module.exports = router