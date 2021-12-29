const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to the datbase....'))
.catch((err) => console.error('Could not connect to the database', err));


// Creating a account Schema 
const accountSchema = new mongoose.Schema({
  acc_name: String,
  acc_number: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  transaction: Boolean 
})

// Creating a collection in mongoose 
const Account = mongoose.model('Bank',  accountSchema);

async function createAccount() {
  const account = new Account({
    acc_name: 'Promise',
    acc_number:  0011223344,
    tags: ['credit', 'debit'],
    transaction: true
  });
  
  const result = await account.save();
  console.log(result);
}

async function getAccounts() {
  const account = await Account
  .find({ acc_name: '/^promise/', transaction: true})
  .sort({acc_name: 1})
  .select({ name: 1, tags: 1})
  console.log(account);
}

createAccount()
getAccounts();


