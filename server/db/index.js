require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const fs = require('fs');
//to use to array:


const MONGODB_DB_NAME = 'eva-pa';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = 'mongodb+srv://eva-pa:TP7DmtZKjkkIburi@clusterclearfashion.tca3t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';//process.env.MONGODB_URI;

let client = null;
let database = null;

/**
 * Get db connection
 * @type {MongoClient}
 */
const getDB = module.exports.getDB = async () => {
  try {
    if (database) {
      console.log('💽  Already Connected');
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

/**
 * Insert list of products
 * @param  {Array}  products
 * @return {Object}
 */
module.exports.insert = async products => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    // More details
    // https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#insert-several-document-specifying-an-id-field
    const result = await collection.insertMany(products, { 'ordered': false });

    return result;
  } catch (error) {
    console.error('🚨 collection.insertMany...', error);
    fs.writeFileSync('products.json', JSON.stringify(products));
    return {
      'insertedCount': error.result.nInserted
    };
  }
};

/**
 * Find products based on query
 * @param  {Array}  query
 * @return {Array}
 */
module.exports.find = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();
    //result=result.then(response => response.toArray());

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};
// Find products with the aggregate function

module.exports.aggregate = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.aggregate(query).toArray();


    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

// 1) FIND products by brand
module.exports.findByBrand = async brand => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    console.log("Entered");
    const result = await collection.find({"brand":brand}).toArray();
    console.log("type", typeof (result));

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};
// Creating 3 methods that :
// Find all products related to a given brands
// Find all products less than a price
// Find all products sorted by price


// FIND products less than a price
module.exports.findLessPrice = async price => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find({ "price": { $lt: price } }).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

//  Find all products sorted by price (ascending)
module.exports.SortedPriceAscending = async() => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.aggregate([{"$sort":{"price":1}}]).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

//  Find all products sorted by price (descending)
module.exports.SortedPriceDescending = async() => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.aggregate([{ "$sort": { "price": -1 } }]).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

// For insomnia :
// Find products by id :
module.exports.findById = async id => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find({"_id":ObjectId(id)}).toArray();
    

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

/**
 * Close the connection
 */
module.exports.close = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error);
  }
};
