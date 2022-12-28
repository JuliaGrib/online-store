let requestURL = '../assets/products.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  let products = request.response;
console.log(products)
}
