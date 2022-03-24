/* eslint-disable no-console, no-process-exit */
const adresseparisbrand = require('./adresseparis.js');


async function obtainAdresseParisProd(eshop = 'https://adresse.paris/630-toute-la-collection') {
    try {
        console.log(`🕵️‍♀️  browsing ${eshop} source`);

        const products = await adresseparisbrand.scrape(eshop);

        console.log(products);
        // Put Dedicated products in json file:   
        var fs = require('fs');
        fs.writeFileSync('adresseparisProducts.json', JSON.stringify(products));
        console.log('done');
        process.exit(0);


    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

const [, , eshop] = process.argv;

obtainAdresseParisProd(eshop);



