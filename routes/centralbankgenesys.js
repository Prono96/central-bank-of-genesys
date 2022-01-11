const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

// Creating a account Schema 
const accountSchema = new mongoose.Schema({
  acc_name: String,
  acc_number: Number,
  state:  String,
  date: { type: Date, default: Date.now },
  transfer: Boolean, 
  withdrawal: Boolean
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
    acc_name: req.body.acc_name,
    acc_number: req.body.acc_number,
    state: req.body.state,
    transfer: req.body.transfer,
    withdrawal: req.body.withdrawal
  });
  account = await account.save(account);
  res.send(account);
});

// Update router
router.put('/:id', async (req, res) => {
  const { error } = validateAccount(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const account = await Account.findByIdAndUpdate(req.params.id, {
    acc_name: req.body.acc_name,
    acc_number: req.body.acc_number,
    state: req.body.state
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
    name: Joi.string().min(4).required()
  };

  return Joi.validate(account, schema);
}

module.exports = router;