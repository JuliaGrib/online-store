export const headerCounter = function() {
  const headerCount = (document.querySelector('.count__header')) as HTMLElement
  const totalPrice = (document.querySelector('.total-price__header')) as HTMLElement

  const localArr = JSON.parse( localStorage.productsLocal)

  let price = 0;
  for(const elem of localArr.products) {
    price = price + elem.price
  }
  headerCount.innerHTML = localArr.products.length
  totalPrice.innerHTML = `Total price: ${price}$`
 
}