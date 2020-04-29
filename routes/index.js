const express = require('express');
const router = express.Router();
const convert = require('../lib/convert')

router.get('/getlist', function (req, res) {
    convert.getlist(function(x){res.send(x)})
})

router.get('/convert', function (req, res) {
    convert.convert(req.query.filename,function(x){res.send(x)})
})

router.get('/delfile', function (req, res) {
    convert.delfile(req.query.filename,function(x){res.send(x)})
})



router.get('/', (req, res) => { res.render('index.ejs') })

module.exports = router