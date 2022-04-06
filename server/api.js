const cors = require('cors');
const { response } = require('express');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

//connect to mongodb:
const db = require('./db/index.js');

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({ 'ack': true });
});
app.get('/products/search', async (request, response) => {

  let price = request.query.price;
  let brand = request.query.brand;
  let limit = request.query.limit;

  // IFs
  // I am not going to create a function inside db/index.js for each case
  // so I will just the basic find function or the aggregate function
  if (price == undefined && brand == undefined && limit == undefined) {
    // Just return all products.
    //db.find().then(x => response.send(x));
    db.aggregate([{ '$sort': { 'price': 1 } }]).then(x => response.send({'total':x.length,'result': x}));

  };
  if (price == undefined && brand == undefined && limit != undefined) {
    //db.aggregate([{'$limit': parseInt(limit) }]).then(x => response.send(x));
    db.aggregate([{ '$limit': parseInt(limit) }]).then(x => response.send({ 'limit': parseInt(limit), 'total': x.length, 'result': x }));
  };
  if (price == undefined && brand != undefined && limit == undefined) {
    //db.findByBrand(brand).then(x => response.send(x));
    db.aggregate([{ '$match': { '$and': [{ 'brand': brand }]}},{'$sort': { "price": 1 } }]).then(x => response.send({'total':x.length,'result': x}));
  };
  if (price == undefined && brand != undefined && limit != undefined) {
    db.aggregate([{ '$match': { '$and': [{ 'brand': brand }]}}, { "$limit": parseInt(limit) }]).then(x => response.send({'limit':parseInt(limit),'total':x.length,'result':x}));
  };
  if (price != undefined && brand == undefined && limit == undefined) {
    //db.findLessPrice(parseFloat(price)).then(x => response.send(x));
    db.aggregate([{ "price": parseFloat(price) }, { '$sort': { 'price': 1 } }]).then(x => response.send({'total':x.length,'result': x}));
  };
  if (price != undefined && brand == undefined && limit != undefined) {
    db.aggregate([{ "price": parseFloat(price) }, { "$limit": parseInt(limit) }, { '$sort': { 'price': 1 } }]).then(x => response.send({'limit':parseInt(limit),total:'x.length','result':x}));
  };
  if (price != undefined && brand != undefined && limit == undefined) {
    //db.findByBrand(brand).then(x => response.send(x));
    db.aggregate([{ '$match': { '$and': [{ 'brand': brand }, { 'price': { '$lte': parseFloat(price) } }] } }, { '$sort': { 'price': 1 } }]).then(x => response.send({'total':x.length,'result': x}))
  };
  if (price != undefined && brand != undefined && limit != undefined) {
    console.log('enter');
    //db.aggregate([{ "brand": brand }, { "price": parseFloat(price) }, { "$limit": parseInt(limit) }]);
    db.aggregate([{ '$match': { '$and': [{ 'brand': brand }, { 'price': { '$lte': parseFloat(price) } }] } }, { '$limit': parseInt(limit) }, { '$sort': { 'price': 1 } }]).then(x => response.send({'limit':parseInt(limit),'total':x.length,'result':x}))
    console.log('eva');
  };
}
);
// Fetch products by id:
app.get('/products/:id', async (request, response) => {

  db.findById(request.params.id).then(x => response.send(x));

});
// example to run on insomnia : "http://localhost:8092/products/6237a43788e0c3ba1ad90593 " GET

// Search for specific products : limit,brand, price



// Find all products:
app.get('/products', async (request, response) => {

  db.find().then(x => response.send(x));

});




console.log("TEST")
//db.find({"brand":"MONTLIMART","$limit":10}).then(response=>console.log(response));
//db.aggregate([{"brand":"MONTLIMART","$limit":10}]).then(response => console.log(response))
//db.find().then(response => console.log(response));
//db.aggregate([{'$limit':10},{"$match":{"brand":"MONLIMART"}}]).then(response => console.log(response));
//db.aggregate([{$match:{"brand":"MONTLIMART"},{$limit:10}}]).then(response => console.log(response));
//db.aggregate([{'$limit':10},{'brand':'MONTLIMART'}]).then(response=>console.log(response));

//db.aggregate([{'$match':{brand:"MONTLIMART"},"$lte":{"price":100},"$limit":5}]).then(response => console.log(response))
//db.aggregate([{ "brand": "MONTLIMART" }, { "price": parseFloat(135) }, { "$limit": parseInt(12) }]).then(response => console.log(response));

//db.aggregate([{'$match':{'$and':[{'brand':brand},{'price':{'$lte':parseFloat(price)}}]}},{'$limit':parseInt(limit)},{'$sort':{'price':1}}])
console.log('fin')


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
