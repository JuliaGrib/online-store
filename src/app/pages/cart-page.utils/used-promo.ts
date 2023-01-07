// import { cartPageComponent } from "../cart-page.component"

// export const usedPromo = function() {
//   let arrayUsedPromo = JSON.parse(localStorage.usedPromo)
//   const appliedPromoContainer = document.querySelector('.applied-promo-container__cart')
//   appliedPromoContainer.innerHTML = ''
//   const totalPrice = document.querySelector('.total-price__cart');
//   const newPrice = document.querySelector('.new-price__cart');
//   const title = document.createElement('div')
//   appliedPromoContainer.classList.add('display-block')
//   title.classList.add('title-applied-promo__cart')
//   appliedPromoContainer.appendChild(title)
//   title.innerHTML = 'Applied code:'
//   arrayUsedPromo.forEach((elem) => {
//     const appliedPromo = document.createElement('div')
//     const code = document.createElement('div')
//     const removeCode = document.createElement('button')
//     appliedPromo.classList.add(`applied-promo__cart`)
//     appliedPromo.classList.add(`${elem}`)
//     code.classList.add('code__cart')
//     removeCode.classList.add('remove-code__cart')
//     totalPrice.classList.add('line-through')
//     newPrice.classList.add('display-flex')
//     appliedPromoContainer.appendChild(appliedPromo)
//     appliedPromo.appendChild(code)
//     appliedPromo.appendChild(removeCode)
//     code.innerHTML = elem;
//     removeCode.innerHTML = 'drop'
//     cartPageComponent.totalNewPrice = cartPageComponent.totalNewPrice - Math.round(cartPageComponent.totalNewPrice * 0.1)
//     newPrice.innerHTML = `New price: ${ cartPageComponent.totalNewPrice }`
//   })
// }

import { cartPageComponent } from "../cart-page.component"

export const usedPromo = function() {
  const arrayUsedPromo: string[] = JSON.parse(localStorage.usedPromo)
  const appliedPromoContainer = (document.querySelector('.applied-promo-container__cart')) as HTMLElement
  appliedPromoContainer.innerHTML = ''
  const totalPrice = (document.querySelector('.total-price__cart')) as HTMLElement
  const newPrice = (document.querySelector('.new-price__cart')) as HTMLElement
  const title = (document.createElement('div')) as HTMLDivElement
  appliedPromoContainer.classList.add('display-block')
  title.classList.add('title-applied-promo__cart')
  appliedPromoContainer.appendChild(title)
  title.innerHTML = 'Applied code:'
  arrayUsedPromo.forEach((elem) => {
    const appliedPromo = (document.createElement('div')) as HTMLDivElement
    const code = (document.createElement('div')) as HTMLDivElement
    const removeCode = (document.createElement('button')) as HTMLButtonElement
    appliedPromo.classList.add(`applied-promo__cart`)
    appliedPromo.classList.add(`${elem}`)
    code.classList.add('code__cart')
    removeCode.classList.add('remove-code__cart')
    totalPrice.classList.add('line-through')
    newPrice.classList.add('display-flex')
    appliedPromoContainer.appendChild(appliedPromo)
    appliedPromo.appendChild(code)
    appliedPromo.appendChild(removeCode)
    code.innerHTML = elem;
    removeCode.innerHTML = 'drop'
    cartPageComponent.totalNewPrice = cartPageComponent.totalNewPrice - Math.round(cartPageComponent.totalNewPrice * 0.1)
    newPrice.innerHTML = `New price: ${ cartPageComponent.totalNewPrice }`
  })
}
