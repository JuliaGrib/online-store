import { IProduct } from "../../../types";
import { homePageComponent } from "../home-page.component";

export const updateSearch = function(search: string) {
  const input = (document.querySelector('.input-main__search')) as HTMLInputElement
  input.value = search
  const tempArray: IProduct[] = [];
  for(let i = 0; i < homePageComponent.visibleProducts.length; i++) {
    const price =  homePageComponent.visibleProducts[i].price
    const stock = homePageComponent.visibleProducts[i].stock
    const title =  homePageComponent.visibleProducts[i].title.toLowerCase();
    const brand =  homePageComponent.visibleProducts[i].brand.toLowerCase();
    const category =  homePageComponent.visibleProducts[i].category.toLowerCase();

    const isIncludePrice = price >= +search;
    const isIncludeStock = stock >= +search;
    const isIncludeTitle = title.includes(search.toLowerCase());
    const isIncludeBrand = brand.includes(search.toLowerCase());
    const isIncludeCategory = category.includes(search.toLowerCase());
    if(isIncludePrice || isIncludeStock || isIncludeTitle || isIncludeBrand || isIncludeCategory) {
      tempArray.push( homePageComponent.visibleProducts[i])
    }
  }
  homePageComponent.visibleProducts = tempArray;
}