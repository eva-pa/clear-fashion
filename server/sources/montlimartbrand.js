const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
/*
const parse = data => {
  const $ = cheerio.load(data);

  return $('.products-grid .product-info')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.regular-price')
          .text()
      );
      // added brand bc products were mixed up in the mongo db
      return {"brand":"MONTLIMART",name, price};
    })
    .get();
};
*/
const parse = data => {
  const $ = cheerio.load(data);

  return $('.category-products .item')
    .map((i, element) => {
      const link = $(element)
        .find('a')
        .attr('href')
      const name = $(element)
        .find('.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.regular-price')
          .text());
      const photo = $(element)
        .find('img').attr('src');
      console.log(photo)
        //.attr('href')
        //.children('img')
        //.attr('src');
        //a.find('.container_c89a5').children('img').eq(0).attr('src');
       // (' .product-image')[0].children[1].attribs.href
      // added brand bc products were mixed up in the mongo db
      return { link, "brand": "MONTLIMART", name, price, photo };
    })
    .get();
};
/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
