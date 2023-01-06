import { homePageComponent } from "../home-page.component";

export const updateSort = function(sort) {
  const options = document.querySelectorAll("option")
        options.forEach((elem) => {
          if(elem.dataset.id == sort) {
            elem.selected = true;
          }
        })
        if(sort === 'price-ASC') {
          homePageComponent.visibleProducts.sort((x, y) => x.price - y.price)
        } else if (sort === 'price-DESC') {
          homePageComponent.visibleProducts.sort((x, y) => y.price - x.price)
        }else if (sort === 'stock-ASC') {
          homePageComponent.visibleProducts.sort((x, y) => x.stock - y.stock)
        } else if (sort === 'stock-DESC') {
          homePageComponent.visibleProducts.sort((x, y) => y.stock - x.stock)
        }
}