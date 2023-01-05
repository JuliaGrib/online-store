import { homePageComponent } from "../home-page.component"

export const extremum = {

  minPrice() {
    let priceArray = []
    for(let i = 0; i < homePageComponent.visibleProducts.length; i++ ) {
      priceArray.push(homePageComponent.visibleProducts[i].price)
    }
    return Math.min.apply(null, priceArray)
  },
  
  maxPrice() {
    let priceArray = []
    for(let i = 0; i < homePageComponent.visibleProducts.length; i++ ) {
      priceArray.push(homePageComponent.visibleProducts[i].price)
    }
    return Math.max.apply(null, priceArray)
  },
  
  minStock() {
    let priceArray = []
    for(let i = 0; i <homePageComponent.visibleProducts.length; i++ ) {
      priceArray.push(homePageComponent.visibleProducts[i].stock)
    }
    return Math.min.apply(null, priceArray)
  },
  
  maxStock() {
    let priceArray = []
    for(let i = 0; i < homePageComponent.visibleProducts.length; i++ ) {
      priceArray.push(homePageComponent.visibleProducts[i].stock)
    }
    return Math.max.apply(null, priceArray)
  },
}

