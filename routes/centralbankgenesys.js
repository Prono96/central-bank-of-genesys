const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Creating a account Schema 
const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  account: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
})

// Creating a collection in mongoose 
const Account = mongoose.model('Bank',  accountSchema);

// get router
router.get('/', async(req, res) => {
  const account = await Account.find().sort('name')
  res.send(account);
});

// Post router
router.post('/', async (req, res) => {
  const { error } = validateAccount(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let account = new Account ({
    name: req.body.name,
    account: req.body.account,
    phone: req.body.phone,
    address: req.body.address
  });
  account = await account.save();
  res.send(account);
});

// Update router
router.put('/:id', async (req, res) => {
  const { error } = validateAccount(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const account = await Account.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    account: req.body.account,
    phone: req.body.phone,
    address: req.body.address
  }, 
  {new: true})

  if (!account) return res.status(404).send('The account with the given ID was not found.');

  res.send(account);
});

// Delete router
router.delete('/:id', async (req, res) => {

  const account = await Account.findByidAndRemove(req.params.id);
  
  if (!account) return res.status(404).send('The account with the given ID was not found.');

  res.send(account);
});

// get account by ID
router.get('/:id', async (req, res) => {
  const account = await Account.findById(req.params.id)

  if (!account) return res.status(404).send('The account with the given ID was not found.');
  res.send(account);
});

//Validate functionality 
function validateAccount(account) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    account: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    address: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(account, schema);
  // return schema.validate(account);
}

module.exports = router; 

