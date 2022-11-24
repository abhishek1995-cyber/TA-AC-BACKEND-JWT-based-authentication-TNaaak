var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.json({message: 'user information'})
});


// registration

router.post('/register', async (req,res,next)=>{
  try {
    var user = await User.create(req.body);
    var token = await user.signToken();
    res.status(201).json({user: user.userJSON(token)})
  } catch (error) {
    next(error)
  }
})

router.post('/login',  async (req,res,next)=>{
    var {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({error: 'email/password required'})
    }
    try {
      var user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "Email not registered"})
      }
      var result = await user.verifyPassword(password);
      if(!result){
        return res.status(400).json({error: 'Invalid password'})
      }
      //  generate token

      var token = await user.signToken();
      res.json({user:user.userJSON(token)})
    } catch (error) {
      next(error)
    }
   
})

module.exports = router;