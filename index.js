const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CBG')
.then(() => console.log('Connected to the database....'))
.catch((err) => console.error('Could not connect to the database', err));


// Creating a account Schema 
const accountSchema = new mongoose.Schema({
  acc_name: String,
  acc_number: String,
  state:  String,
  date: { type: Date, default: Date.now },
  transfer: Boolean, 
  withdrawal: Boolean
})

// Creating a collection in mongoose 
const Account = mongoose.model('Bank',  accountSchema);

// Creating a user account
async function createAccount() {
  const account = new Account({
    acc_name: 'Ben d Prof',
    acc_number:  00112234222,
    state: 'Enugu',
    transfer: false,
    withdrawal: true
  });
  
  const result = await account.save();
  console.log(result);
}

// Getting the user account
async function getAccounts() {
  const account = await Account.find();
  console.log(account);
}

//Updating the users accout 
async function updateAccount(id) {
  const update_acc = await Account.findById(id);
  if (!update_acc) return;
  update_acc.set({
    acc_name: 'Joshua Ejah',
    acc_number: 00112233445
  });

  const result = await update_acc.save();
  console.log('This user account has been updated', result);
}


// Deleting a user account
async function removeAccount(id) {
  const result = await Account.findByIdAndRemove(id);
  console.log('This account has been deleted from bank CBG', result);
}


// Calling the functions
createAccount();
getAccounts();
updateAccount('61d59d4c2454a72d18db92e3');
removeAccount('61d5a17ddf3eaa589b659d95');


