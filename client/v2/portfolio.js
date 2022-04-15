// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';


// current products on the page
let currentProducts = [];
let currentPagination = {};
let brand ; // for the fetch products function
let price ; // for the fetch products function
let limit =12 ;
let sorting ; // for the fetch products function
//let sortingDefault = 1;
//let currentBrand = 'option brand';
//let currentBrands =[];
//let productsExtract = fetchProducts(currentPagination, 139);


// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select'); //test feature 2
const lessThanPrice = document.querySelector('#submitPrice') // price entered by user, search for items that cost less than this price
const selectSorting = document.querySelector('#sort-select')

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = (products) => {
 currentProducts = products;
};

var queryFormation = (limit,price,brand,sorting) => {
  let query = `https://server-fawn-mu.vercel.app/products/search?`;
  if(brand == ""){brand=undefined};
  if (price != undefined) {
    query = `${query}&price=${price}`;
  }
  if (brand != undefined) {
    query = `${query}&brand=${brand}`;
  }
  if (limit != undefined) {
    query = `${query}&limit=${limit}`;
  }
  else{console.log('LIMIT DEFINED');};
  if (sorting != undefined) {
    query = `${query}&sorting=${sorting}`;
  }
  console.log('LA QUERYYYYY',query)
  return query;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (limit,price,brand,sorting) => {

  let query = queryFormation(limit, price, brand, sorting);
  try {
    const response = await fetch(query);
    const body = await response.json();
    return body.result;
  } catch (error) {
    console.error(error);
    return { currentProducts, currentPagination };
  }
};
console.log('premiere boucle');
 let products12 = fetchProducts(limit,135,brand,sorting);
 console.log('PRODUCTS',products12);
 console.log('fin boucle');

/** 
const fetchProductsByBrand = async (page = 1, size = 12,brand='loom') => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}&brand=${brand}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
}; */

//var brands = []
/**
* Fetch brands  from api
* @param  {Number}  [page=1] - current page to fetch
* @return {Array}
*/
/*
const fetchBrands = async (page = 1, size = 139) => {
  console.log("Début du test")
  try {
    const response = await fetch(`https://clear-fashion-api.vercel.app?page=${page}&size=${size}`);

    const body = await response.json();
    if (body.success !== true) {
      console.error(body);
      return { currentProducts, currentPagination };
    }
    // Extract the brands and put them in a list with function extract brand
    console.log("body.data.result", body.data.result);
    brands = ExtractBrands(body.data.result);
    console.log('brands extraction test', brands);
    console.log('fin du test');
    return brands;
    // return body.data;
  } catch (error) {
    console.error(error);
    return { currentProducts, currentPagination };
  }
};
*/
// console.log(fetchBrands());
/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  console.log(products);
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product._id}>    
          <span style="padding-right:3px; padding-top: 3px; display:block;">
        <img class="manImg" src=${product.photo}></img>
      </span>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}€</span>

      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const { currentPage, pageCount } = pagination;
  const options = Array.from(
    { 'length': pageCount },
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const { count } = pagination;
  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
 // brands = fetchBrands();
  //renderBrand(brands); 
};

// function to have distinct brand names in array 

/*
function ExtractBrands(productsList) {
  var brandsList = [];
  for (var i = 0; i < productsList.length; i++) {
    var isInList = false;
    console.log("Avant rentrer dans la boucle");
    for (var j = 0; j < brandsList.length; j++) {
      console.log("Rentré dans la boucle");
      if (productsList.brand == brandsList[j]) {
        isInList = true;
        j = brandsList.length;
      };
      if (isInList == false) {
        brandsList.push(productsList.brand);
      };

    }
  }
  console.log("Extract brand function test brandlist:", brandsList);
  return brandsList;
}; 
*/

/*
function ExtractBrands(productsList) {

  var tempBrands = [];
  //Put brands in list, list with repetitions 
  for (var i = 0; i < productsList.length; i++) {
    tempBrands.push(productsList[i].brand);
  }
  console.log("tempbrands sans filtre", tempBrands);
  var brandsList = tempBrands.filter(function (ele, pos) {
    return tempBrands.indexOf(ele) == pos;
  })
  return brandsList;
}

*/

//let brandNamesList = ExtractBrands(productsExtract);
// render brand select
/*
const renderBrand = brandNamesList => {
  options = [];
  var line = '';
 
  for (i = 0; i < brandNamesList.length; i++) {
    line += '`<option value="${' + brandNames[i] + '}">${' + brandNames[i] + '}</option>`';
  };
  selectBrand.innerHTML = options;
};
*/

/**
 * Render page selector
 * @param  {Array} brands
 */
/*
brands = fetchBrands();
console.log("BRANDS ", brands)
const renderBrand = brands => {
  console.log("RENDER BRAND", brands);

  var optionsLst = [];
  var options = "";
  var txt = "";
  var singleBrand = "";
  console.log("options test eva brands render brands", brands);
  console.log("2!!!");
  //txt='"<option value="' + brands[i] + '">' + brands[i] + '</option>'
  txt = `<option value="select">Select</option>`;
  console.log("TXT!!!!", txt);
  console.log('brands length', brands.length);
  for (var i = 0; i < brands.length; i++) {
    // txt = '"<option value="' + brands[i] + '">' + brands[i] + '</option>';
    singleBrand = brands[i];
    txt = `<option value="${singleBrand}">${singleBrand}</option>`;
    console.log("TXT 2 BOUCLE!!", txt);
    optionsLst.push(txt);
  }
  console.log("TXT 3", txt);
  options = optionsLst.join('');
  console.log("options test eva ", options);
  selectBrand.innerHTML = options;
  selectBrand.selectedIndex = brands.indexOf(currentBrand) + 1;

};
*/

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * 
 * the limit variable in our case
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(parseInt(event.target.value),price,brand,sorting);

  setCurrentProducts(products);

  render(currentProducts, currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts(limit,price,brand,sorting);
  console.log("111111");
  console.log('2222', products);
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

// Feature 1:
selectPage.addEventListener('change', async (event) => {
  limit = parseInt(event.target.value); // changes the variable globally or do i have to create setcurrent etc...?
  const products = await fetchProducts(limit, currentProducts.length);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

// Feature 2:
selectBrand.addEventListener('change', async(event)=>{
  brand = event.target.value; 
  if(brand == 'montlimart'){
    brand = 'MONTLIMART';
  };
  const products = await fetchProducts(limit,price,brand,sorting);
  setCurrentProducts(products);
  render(currentProducts,currentPagination);
})

// Filter by price (Ascending= Cheaper) (Descending = Expensive)
selectSorting.addEventListener('change', async(event)=>{
  sorting = event.target.value;
  const products = await fetchProducts(limit,price,brand,sorting);
  setCurrentProducts(products);
  render(currentProducts,currentPagination);

});

// Give products with prince inferior to input value by user
lessThanPrice.addEventListener('change', async(event)=>{
  price = event.target.value;
  sorting = 1; // users can change the sort after using this functionality if they want the result to be sorted
  const products = await fetchProducts(limit,price,brand,sorting);
  setCurrentProducts(products);
  render(currentProducts,currentPagination);
})

/*
selectBrand.addEventListener('change', async (event) => {
  productsBrand = []
  products.forEach(element => {
    if (element.brand == event.target.value) {
      productsBrand.push(element);
    };
    setCurrentProducts(productsBrand);
    setCurrentBrands(productsBrand)
    render(currentProducts, currentPagination, currentBrands)
  });

});
*/

/*
selectBrand.addEventListener('change', async (event) => {
  currentProducts = [];

  const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
  currentBrand = event.target.value;
  if (currentBrand != 'option brand') {
    //currentProducts = ExtractBrands(products.result);
    //const BrandToShow= ExtractBrands(products.result);
    for (var i = 0; i < products.result.length; i++) {
      if (products.result[i].brand == currentBrand) {
        currentProducts.push(products.result[i]);
      };
    };
    setCurrentProducts(currentProducts);
    render(currentProducts, currentPagination);
  }
  else {
    currentProducts = products.result;
    setCurrentProducts(currentProducts);
    render(currentProducts, currentPagination);
  };

});
*/

//Feature 3: Filter by recent products

