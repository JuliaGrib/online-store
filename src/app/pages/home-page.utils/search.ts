import { homePageComponent } from "../home-page.component";

export const updateSearch = function(search: string) {
  const input = (document.querySelector('.input-main__search')) as HTMLInputElement
  input.value = search
  const tempArray = [];
  for(let i = 0; i < homePageComponent.visibleProducts.length; i++) {
    // eslint-disable-next-line
    let price: any =  homePageComponent.visibleProducts[i].price;
    price = String(price);
    // eslint-disable-next-line
    let stock: any =  homePageComponent.visibleProducts[i].stock;
    stock = String(stock);
    const title =  homePageComponent.visibleProducts[i].title.toLowerCase();
    const brand =  homePageComponent.visibleProducts[i].brand.toLowerCase();
    const category =  homePageComponent.visibleProducts[i].category.toLowerCase();

    const isIncludePrice = price.includes(search);
    const isIncludeStock = stock.includes(search);
    const isIncludeTitle = title.includes(search);
    const isIncludeBrand = brand.includes(search);
    const isIncludeCategory = category.includes(search);
    if(isIncludePrice || isIncludeStock || isIncludeTitle || isIncludeBrand || isIncludeCategory) {
      tempArray.push( homePageComponent.visibleProducts[i])
    }
  }
  homePageComponent.visibleProducts = tempArray;
}