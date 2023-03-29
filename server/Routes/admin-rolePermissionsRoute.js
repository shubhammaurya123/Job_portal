const express = require('express');
const router = express.Router();

const Permission = require('../models/adminPermission.model')
const User = require('../models/adminUser.model')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'goodb$oy';

// ROUTE 1: using: GET "/api/permission/fetchpermission". Login required
router.get('/fetchpermission/:role' , async (req, res) => {
  try {
      const permission = await Permission.find({role : req.params.role});
      res.json(permission);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
router.get('/fetchpermission' , async (req, res) => {
    try {
        const permission = await Permission.find();
        res.json(permission);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchpermission/find/:role' , async (req, res) => {
  try {
      const permission = await Permission.find({role : req.params.role});
      res.json(permission);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

// ROUTE 2: Add a new Note using: POST "/api/permission/addpermission". Login required
router.post('/addpermission',  [
    body('role', 'Enter a valid role').isLength({ min: 3 }),
   
     ], async (req, res) => {
        try {
            const { role ,permission } = req.body;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const permissionData = new Permission({
                role ,permission
            })
            const savedNote = await permissionData.save()
            res.json(savedNote)
            console.log(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
    
// ROUTE 2: Add a new Note using: POST "/api/permission/adduser". Login required
    router.post('/adduser', [
        body('role', 'Enter a valid role'),
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
      ], async (req, res) => {
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
          // Check whether the user with this email exists already
          let user = await User.findOne({ email: req.body.email });
        
          if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
          }
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(req.body.password, salt);
        
          // Create a new user
          user = await User.create({
            role : req.body.role,
            name: req.body.name,
            password: secPass,
            email: req.body.email,
          });
          const data = {
            user: {
              id: user.id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
           let success =true;
          // res.json(user)
          let role = user.role
          res.json({success})
      
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
        }
      })
   
    router.post('/login', [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists(),
      ], async (req, res) => {
        let success = false;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
          let user = await User.findOne({ email });
          if (!user) {
            success = false
           
            return res.status(400).json({ error: "Please try to login with correct credentials" });
          }
      
          const passwordCompare = await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
          }
      
          const data = {
            user: {
              id: user.id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;  let role = user.role;
          res.json({role  , success, authtoken })
      
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
        }
      });
      
      


module.exports = router