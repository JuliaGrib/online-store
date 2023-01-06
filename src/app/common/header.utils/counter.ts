export const headerCounter = function() {
  const headerCount = (document.querySelector('.count__header')) as HTMLElement
  const localArr = JSON.parse( localStorage.productsLocal)
  headerCount.innerHTML = localArr.products.length
}