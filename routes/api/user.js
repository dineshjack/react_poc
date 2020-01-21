const express = require("express");
const router = express.Router();

//model connect
const User = require("../../models/User");

//api to register user or update user
router.post('/',
    async (req, res) => {
        const {id, name, email, dob, skills, location } = req.body;
        console.log(id);
        const requestData = {};
        if (name) requestData.name = name;
        if (email) requestData.email = email;
        if (dob) requestData.dob = dob;
        if (skills) {
            requestData.skills = skills.split(',').map(skill => skill.trim());
        }
        if (location) requestData.location = location;
        try {
            if (id) {
                user = await User.findByIdAndUpdate(id, requestData);
               
            } else {
                user = new User(requestData);
                await user.save();
            }
            const payload = {
                user: {
                    id: user.id
                }
            };
            res.json(payload);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }
);


//api to get user data
router.get('/',
    async (req, res) => {
        try {
            const usersList = await User.find();
            res.json(usersList);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

//api to get user data by id
router.get('/:id',  async (req, res) => {
    try {
      const getUser = await User.findById(req.params.id);
  
      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !getUser) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.json(getUser);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

  //api to delete user
  router.delete('/:id', async (req, res) => {
    try {
      const userDel = await User.findById(req.params.id);
  
      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !userDel) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      await userDel.remove();
  
      res.json({ msg: 'User removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

//   //
//   router.put('/',  async (req, res) => {
//     const { id, name, email, dob, skills, location } = req.body;
//     console.log(id);
//     const requestData = {};
//         if (name) requestData.name = name;
//         if (email) requestData.email = email;
//         if (dob) requestData.dob = dob;
//         if (skills) {
//             requestData.skills = skills.split(',').map(skill => skill.trim());
//         }
//         if (location) requestData.location = location;
//     try {
      
  
//       // Check for ObjectId format and post
//      // if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !getUser) {
//      //   return res.status(404).json({ msg: 'User not found' });
//      // }

//       const getUser = await User.findByIdAndUpdate(id,requestData);
  
//       res.json(getUser);
//     } catch (err) {
//       console.error(err.message);
  
//       res.status(500).send('Server Error');
//     }
//   });
  

 module.exports = router;
