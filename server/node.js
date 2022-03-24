const mongoose = require('mongoose');
const db = require('./db/index.js')

const montlimart = require('./sources/montlimartProducts.json')
const dedicatedbrand= require('./sources/dedicatedProducts.json') 
const adresseparis=require('./sources/adresseparisProducts.json') // stored the json where the file for scraping are
db.getDB()
// Insert products of the 3 brands into the mongo database
/*
db.insert(montlimart)
db.insert(dedicatedbrand)
db.insert(adresseparis)
// commented this part since i dont wanna insert the same products multiple times
*/ 

// Testing the 3 methods :
// Find by brand
prod_query=[];
test=db.find({"brand":"MONTLIMART"}).then(response => response.forEach(element => prod_query.push(element)));
//.then(response => response.toArray());

console.log("Products by brand : MONTLIMART");
prod_query.forEach(element => console.log(element));
console.log("a",prod_query);
test= db.find({"brand":"MONTLIMART"}).then(response => console.log("By brand MONTLIMART",response));
test2= db.findByBrand("MONTLIMART").then(response => console.log("By brand MONTLIMART 2",response));


// Find all products less than a price
test3= db.findLessPrice(65).then(response => console.log("Price lower than 65",response));

// Sort products by price descending order

test4= db.SortedPriceDescending().then(response => console.log('Sorting by price (desc)',response));

// Sort products by price ascending order
test5=db.SortedPriceAscending().then(response=>console.log('Sorting by price (ascending)',response));