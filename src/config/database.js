const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shaadansari8081:LY78gIVxP0LZuNsR@devtinder.dczu9.mongodb.net/devTinder"
  );
};

module.exports=connectDB;































// const { MongoClient } = require('mongodb');

// require("mongodb")

//  const url="mongodb+srv://shaadansari8081:LY78gIVxP0LZuNsR@devtinder.dczu9.mongodb.net/ strings"

//  const client =new MongoClient(url);

//  const dbName ="devTinder";

//  async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('user');

//   // the following code examples can be pasted here...

//   const findResult = await collection.find({}).toArray();
// console.log('Found documents =>', findResult);

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
