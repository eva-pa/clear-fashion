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
  response.send({'ack': true});
});

// Fetch products by id:
app.get('/products/:id', async(request,response)=>{

db.findById(request.params.id).then(x => response.send(x));

});
// example to run on insomnia : "http://localhost:8092/products/6237a43788e0c3ba1ad90593 " GET

// Search for specific products : limit,brand, price
app.get('/products/search',async(request,response)=>{
  
  let price = request.query.price;
  let brand = request.query.brand;
  let limit = request.query.limit;

  // IFs
  // I am not going to create a function inside db/index.js for each case
  // so I will just the basic find function or the aggregate function
  if(price==undefined && brand == undefined && limit ==undefined ){
    // Just return all products.
    db.find().then(x => response.send(x));
  };
  if(price==undefined && brand == undefined && limit == defined){
    db.aggregate([{'$limit':parseInt(limit)}]).then(x => response.send(x));
  };
  if(price==undefined && brand == defined && limit == undefined){
    db.findByBrand(brand).then(x => response.send(x) );
  };
  if(price==undefined && brand == defined && limit == defined){
    db.find({"brand":brand,"$limit":parseInt(limit)});
  };
  if(price==defined && brand == undefined && limit == undefined){

  };
  if(price==defined && brand == undefined && limit == defined){

  };
  if(price==defined && brand == defined && limit == undefined){

  };
  if(price==defined && brand == defined && limit == defined){

  };
  



}
);


// Find all products:
app.get('/products', async(request,response)=>{

  db.find().then(x => response.send(x));
  
  });




console.log("TEST")
db.find().then(response => console.log(response));

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
