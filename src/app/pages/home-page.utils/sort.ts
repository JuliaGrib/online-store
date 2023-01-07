/* eslint-disable */ 
import { homePageComponent } from "../home-page.component";

export const updateSort = function(sort: string) {
  const options: NodeListOf<HTMLOptionElement> = document.querySelectorAll("option")
        options.forEach((elem: HTMLOptionElement) => {
          if(elem.dataset.id == sort) {
            elem.selected = true;
          }
        })
        if(sort === 'price-ASC') {
          homePageComponent.visibleProducts.sort((x: any, y: any) => x.price - y.price)
        } else if (sort === 'price-DESC') {
          homePageComponent.visibleProducts.sort((x: any, y: any) => y.price - x.price)
        }else if (sort === 'stock-ASC') {
          homePageComponent.visibleProducts.sort((x: any, y: any) => x.stock - y.stock)
        } else if (sort === 'stock-DESC') {
          homePageComponent.visibleProducts.sort((x: any, y: any) => y.stock - x.stock)
        }
}