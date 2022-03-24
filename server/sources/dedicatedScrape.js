/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./dedicatedbrand.js');


async function obtainDedicatedProd(eshop = 'https://www.dedicatedbrand.com/en/men/all-men') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    // Put Dedicated products in json file:   
    var fs = require('fs');
    fs.writeFileSync('dedicatedProducts.json', JSON.stringify(products));
    console.log('done');
    process.exit(0);


  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [, , eshop] = process.argv;

obtainDedicatedProd(eshop);



