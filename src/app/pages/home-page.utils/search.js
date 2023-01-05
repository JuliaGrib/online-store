import { homePageComponent } from "../home-page.component";

export const updateSearch = function(search) {
  let input = document.querySelector('.input-main__search')
  input.value = search
  let tempArray = [];
  for(let i = 0; i <  homePageComponent.visibleProducts.length; i++) {
    let price =  homePageComponent.visibleProducts[i].price;
    price = String(price);
    let stock =  homePageComponent.visibleProducts[i].stock;
    stock = String(stock);
    let title =  homePageComponent.visibleProducts[i].title.toLowerCase();
    let brand =  homePageComponent.visibleProducts[i].brand.toLowerCase();
    let category =  homePageComponent.visibleProducts[i].category.toLowerCase();

    let isIncludePrice = price.includes(search);
    let isIncludeStock = stock.includes(search);
    let isIncludeTitle = title.includes(search);
    let isIncludeBrand = brand.includes(search);
    let isIncludeCategory = category.includes(search);
    if(isIncludePrice || isIncludeStock || isIncludeTitle || isIncludeBrand || isIncludeCategory) {
      tempArray.push( homePageComponent.visibleProducts[i])
    }
  }
  homePageComponent.visibleProducts = tempArray;
}