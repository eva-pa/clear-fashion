/* eslint-disable no-console, no-process-exit */
const montlimartbrand = require('./montlimartbrand.js');


async function obtainMonlimartProd (eshop = 'https://www.montlimart.com/toute-la-collection.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimartbrand.scrape(eshop);

    console.log(products);
    var productsMontlimart=products; // type object?
    console.log('done');
    //process.exit(0);
    return products;
    
  } catch (e) {
    console.error(e);
    //process.exit(1);
  }
}

const [,, eshop] = process.argv;

prod=obtainMonlimartProd(eshop);

// Put Montlimart products in json file:
var fs = require('fs');
fs.writeFileSync('montlimartProducts.json',JSON.stringify(prod));


