import { productsList } from "../../lists/products"

export const extremum = {

  minPrice() {
    let priceArray = []
    for(let i = 0; i < productsList.products.length; i++ ) {
      priceArray.push(productsList.products[i].price)
    }
    return Math.min.apply(null, priceArray)
  },
  
  maxPrice() {
    let priceArray = []
    for(let i = 0; i < productsList.products.length; i++ ) {
      priceArray.push(productsList.products[i].price)
    }
    return Math.max.apply(null, priceArray)
  },
  
  minStock() {
    let priceArray = []
    for(let i = 0; i < productsList.products.length; i++ ) {
      priceArray.push(productsList.products[i].stock)
    }
    return Math.min.apply(null, priceArray)
  },
  
  maxStock() {
    let priceArray = []
    for(let i = 0; i < productsList.products.length; i++ ) {
      priceArray.push(productsList.products[i].stock)
    }
    return Math.max.apply(null, priceArray)
  },
}

