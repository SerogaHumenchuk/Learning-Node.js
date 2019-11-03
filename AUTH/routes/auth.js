const router = require('express').Router();
const User = require('../model/User');
const bycrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  try {
    await registerValidation(req.body);

    // Checking if the user is already in DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist');

    // Hash password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(req.body.password, salt);

    // Createa new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err.details[0].message);
  }
});

//LOGIN
router.post('/login', (res, res) => {
  
});

module.exports = router;
