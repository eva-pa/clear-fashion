/* eslint-disable no-console, no-process-exit */
const montlimartbrand = require('./montlimartbrand.js');


async function obtainMonlimartProd(eshop = 'https://www.montlimart.com/toute-la-collection.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimartbrand.scrape(eshop);

    console.log(products);
    // Put Montlimart products in json file:   
    var fs = require('fs');
    //var productsMontlimart =JSON.stringify(products);
    fs.writeFileSync('montlimartProducts.json', JSON.stringify(products));
    console.log('done');
    process.exit(0);


  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [, , eshop] = process.argv;

obtainMonlimartProd(eshop);



