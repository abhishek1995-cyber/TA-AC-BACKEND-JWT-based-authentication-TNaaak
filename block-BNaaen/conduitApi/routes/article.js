var express = require('express');
var router = express.Router();
var Article = require('../models/article')

router.post('/',async (req,res,next)=>{
    var article = await Article.create(req.body);
    res.status(200).json({article})
})

module.exports = router;
