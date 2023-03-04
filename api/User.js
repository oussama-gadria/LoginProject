const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Define a secret key for JWT
const secretKey = 'mysecretkey';

// signup
router.post('/signup', (req, res) => {
  let { name, email, password, dateOfBirth } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  if (name == '' || email == '' || password == '' || dateOfBirth == '') {
    res.json({
      status: 'FAILED',
      message: 'Empty input fields!',
    });
  } else if (password.length < 8) {
    res.json({
      status: 'FAILED',
      message: 'Invalid password entered!',
    });
  } else {
    // checking if the user exists
    console.log('Before User.find()');
    User.find({ email })
      .then((result) => {
        console.log('After User.find()');
        if (result.length) {
          res.json({
            status: 'Failed',
            message: 'User already exists!',
          });
        } else {
          // save User
          // Generate JWT token
          const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
          // password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPasswords) => {
              const newUser = new User({
                name,
                email,
                password: hashedPasswords,
                dateOfBirth,
              });
              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: 'SUCCESS',
                    message: 'SignUp successful',
                    data: result,
                    token,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: 'FAILED',
                    message: 'An error occurred while saving user account' + err.message,
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An error occurred while hashing password!',
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 'failed',
          message: 'An error occurred while checking for existing user!',
        });
      });
  }
});

router.post('/signin', async (req, res) => {
    const {emailReq,password}=req.body; 
    const user = await User.findOne(
      {where: {email:emailReq}});
    console.log(user);
    if (!user) {
      res.status(400).json({error:"User Doesn't Exist"})
    }else{
      const dbPassword=user.password
      console.log(dbPassword)
      console.log(password)
      console.log(emailReq)
     
      bcrypt.compare(password,dbPassword).then((match)=>{ 
        console.log(match)
      if (!match){ 
        res.status(400).json({error:"Wrong password !"})
      }else{ 
        res.json("LOGGED IN ")
      }
    })
     }   

});

module.exports = router;