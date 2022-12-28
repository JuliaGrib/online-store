import { WFMComponent } from "../../framework/index";
import { productsList} from "../lists/products"

class CartPageComponent extends WFMComponent {
  constructor(config){
      super(config)
  }

  arrayProducts = {};
  countOnceItem = [];
  totalPrice = 0;
  totalProducts = 0;

  actions() {
    return {
        'makeCart': 'makeCart',
        'checkPromo': 'checkPromo'
    }
  }

  events() {
    return {
        'click .add-item__cart': 'addProductToCart',
        'click .remove-item__cart': 'removeProductFromCart',
        'click .buy-now-button__cart' : 'buyNow',
    }
  }

  makeCart() {
    //парсим локалсторадж
    this.arrayProducts = JSON.parse(localStorage.productsLocal);
    if(this.arrayProducts.products.length == 0) {
      const container = document.querySelector('.container__cart')
      container.innerHTML = "ПУСТО"
      return
    }
    //создаем массив с колличеством каждого одинакого элемента  
    this.countOnceItem = this.arrayProducts.products.reduce(function(acc, el) {
      acc[el.id] = (acc[el.id] || 0) + 1;
      return acc;
    }, {});

    //фильтруем повторяющиееся элементы 
    let tempArrayProducts =  this.arrayProducts.products.reduce((o, i) => {
      if (!o.find(v => v.id == i.id)) {
        o.push(i);
      }
      return o;
    }, []); 
    //подсчёт общей цены
    //константы селекторов
    const container = document.querySelector('.container__cart')
    const productsCart = document.querySelector('.item-products__cart');
    const countProductsCart = document.querySelector('.count-items__cart');
    const pageNumCart = document.querySelector('.pages-num__cart')
    const totalProductsCart = document.querySelector('.total-products__cart')
    const totalPriceCart = document.querySelector('.total-price__cart')

    countProductsCart.innerHTML = `Items: ${tempArrayProducts.length}`
    pageNumCart.innerHTML = tempArrayProducts.length%2;

    tempArrayProducts.forEach((elem, index) => {

      let idProduct = elem.id
      let priceProduct = elem.price

      const itemCart = document.createElement('div');
      const idItem = document.createElement('div');
      const infoItem = document.createElement('div');
      const imgItem = document.createElement('img');
      const detailItem = document.createElement('div');
      const nameItem = document.createElement('div');
      const descriptionItem = document.createElement('div');
      const additionalItem = document.createElement('div');
      const countItemContainer = document.createElement('div');
      const countItem = document.createElement('div');
      const addItem = document.createElement('button');
      const removeItem = document.createElement('button');
      const priceItem = document.createElement('div');
      const stockItem = document.createElement('div')
      

      itemCart.classList.add(`item__cart`)
      itemCart.classList.add(`item-${elem.id}__cart`)
      idItem.classList.add('id-item__cart')
      infoItem.classList.add('info-item__cart')
      imgItem.classList.add('img-item__cart')
      detailItem.classList.add('detail-item__cart')
      nameItem.classList.add('name-item__cart')
      descriptionItem.classList.add('description-item__cart')
      additionalItem.classList.add('additional-item__cart')
      countItemContainer.classList.add('count-item-container__cart')
      countItem.classList.add(`count-item-${elem.id}__cart`)
      addItem.classList.add('add-item__cart')
      removeItem.classList.add('remove-item__cart')
      priceItem.classList.add(`price-item-${elem.id}__cart`)
      stockItem.classList.add('stock-item__cart');

      itemCart.setAttribute('data-id', `${elem.id}`);
      addItem.setAttribute('data-id', `${elem.id}`);
      removeItem.setAttribute('data-id', `${elem.id}`);

      idItem.innerHTML = index+1;
      imgItem.src = elem.thumbnail;
      nameItem.innerHTML = elem.title;
      descriptionItem.innerHTML = elem.description
      countItem.innerHTML = this.countOnceItem[idProduct];
      addItem.innerHTML = '+'
      removeItem.innerHTML = '-'
      priceItem.innerHTML = `${priceProduct * this.countOnceItem[idProduct]}$`
      stockItem.innerHTML = `Stock: ${elem.stock}`

      productsCart.appendChild(itemCart);

      itemCart.appendChild(idItem);
      itemCart.appendChild(infoItem);
      itemCart.appendChild(additionalItem);

      infoItem.appendChild(imgItem);
      infoItem.appendChild(detailItem);

      detailItem.appendChild(nameItem);
      detailItem.appendChild(descriptionItem);

      additionalItem.appendChild(stockItem)
      additionalItem.appendChild(countItemContainer)
      additionalItem.appendChild(priceItem)

      countItemContainer.appendChild(addItem)
      countItemContainer.appendChild(countItem)
      countItemContainer.appendChild(removeItem)

      let totalItemPrice = elem.price * this.countOnceItem[idProduct]
      this.totalPrice = this.totalPrice + totalItemPrice
      this.totalProducts = this.totalProducts + this.countOnceItem[idProduct]
    })
    totalPriceCart.innerHTML = `Total price: ${this.totalPrice}$`
    totalProductsCart.innerHTML = `Products: ${this.totalProducts}`;
  }

  addProductToCart(event) {

    let currentId = event.target.dataset.id
    let currentItem = this.arrayProducts.products.find(elem => elem.id == currentId);

    if(this.countOnceItem[currentId] === currentItem.stock) {
      return
    }

    let localArr = JSON.parse( localStorage.productsLocal)
    localArr.products.push(currentItem);
    localStorage.productsLocal = JSON.stringify(localArr);

    const countItem = document.querySelector(`.count-item-${currentId}__cart`);
    const priceItem = document.querySelector(`.price-item-${currentId}__cart`);
    const totalPriceCart = document.querySelector('.total-price__cart')
    const totalProductsCart = document.querySelector('.total-products__cart')

    this.countOnceItem[currentId]++
    countItem.innerHTML = this.countOnceItem[currentId];
    priceItem.innerHTML = `${currentItem.price * this.countOnceItem[currentId]}$`
    this.totalPrice = this.totalPrice + currentItem.price
    this.totalProducts++;
    totalPriceCart.innerHTML = `Total price: ${this.totalPrice}$`
    totalProductsCart.innerHTML = `Products: ${this.totalProducts}`;
  }

  removeProductFromCart(event) {
    let currentId = event.target.dataset.id
    let currentItem = this.arrayProducts.products.find(elem => elem.id == currentId);
    let indexItem = this.arrayProducts.products.indexOf(currentItem)
    let localArr = JSON.parse( localStorage.productsLocal)
    localArr.products.splice(indexItem, 1);
    localStorage.productsLocal = JSON.stringify(localArr);

    const countItem = document.querySelector(`.count-item-${currentId}__cart`);
    const priceItem = document.querySelector(`.price-item-${currentId}__cart`);
    const totalPriceCart = document.querySelector('.total-price__cart')
    const totalProductsCart = document.querySelector('.total-products__cart')

    this.countOnceItem[currentId]--
    if(this.countOnceItem[currentId] == 0) {
      let item = document.querySelector(`.item-${currentId}__cart`)
      item.remove();
      console.log(localArr.products)
    }
    if(localArr.products.length == 0) {
      const container = document.querySelector('.container__cart')
      container.innerHTML = "ПУСТО"
      return
    }
    countItem.innerHTML = this.countOnceItem[currentId];
    priceItem.innerHTML = `${currentItem.price * this.countOnceItem[currentId]}$`
    this.totalPrice = this.totalPrice - currentItem.price
    totalPriceCart.innerHTML = `Total price: ${this.totalPrice}$`
    this.totalProducts--;
    totalProductsCart.innerHTML = `Products: ${this.totalProducts}`;
  }

  buyNow(event) {
    console.log(event)

    const container = document.querySelector('.container__cart')

    const buyNow = document.createElement('div');
    const modal = document.createElement('div');
    const form = document.createElement('form');
    const personalDetails = document.createElement('div')
    const cardDetails = document.createElement('div');
    const confirm = document.createElement('button');
    const title = document.createElement('h2');
    const personName = document.createElement('div');
    const phoneNumber = document.createElement('div');
    const address = document.createElement('div');
    const email = document.createElement('div');
    const personNameInput = document.createElement('input');
    const phoneNumberInput = document.createElement('input');
    const addressInput = document.createElement('input');
    const emailInput = document.createElement('input');
    
    buyNow.classList.add('buy-now__cart');
    modal.classList.add('modal__cart');
    form.classList.add('form__cart');
    personalDetails.classList.add('personal-details__cart');
    cardDetails.classList.add('card-details__cart');

    title.classList.add('title-personal__cart');
    personName.classList.add('person-name__cart');
    phoneNumber.classList.add('phone-number__cart');
    address.classList.add('address__cart');
    email.classList.add('email__cart');

    personName.classList.add('details-cart')
    phoneNumber.classList.add('details-cart')
    address.classList.add('details-cart')
    email.classList.add('details-cart');

    personNameInput.classList.add('person-name-input__cart');
    phoneNumberInput.classList.add('phone-number-input__cart');
    addressInput.classList.add('address-input__cart');
    emailInput.classList.add('email-input__cart');

    personNameInput.classList.add('input-cart')
    phoneNumberInput.classList.add('input-cart')
    addressInput.classList.add('input-cart')
    emailInput.classList.add('input-cart')

    personNameInput.placeholder = "Name"
    phoneNumberInput.placeholder = "Phone"
    addressInput.placeholder = "Delivery Address"
    emailInput.placeholder = "E-Mail"

    container.appendChild(buyNow);

    buyNow.appendChild(modal);

    modal.appendChild(form);

    form.appendChild(personalDetails);
    form.appendChild(cardDetails);
    form.appendChild(confirm);

    personalDetails.appendChild(title);
    personalDetails.appendChild(personName);
    personalDetails.appendChild(phoneNumber);
    personalDetails.appendChild(address);
    personalDetails.appendChild(email);

    personName.appendChild(personNameInput)
    phoneNumber.appendChild(phoneNumberInput)
    address.appendChild(addressInput)
    email.appendChild(emailInput)


    confirm.innerHTML = 'confirm';
    title.innerHTML = 'Personal Details'
  }

  checkPromo() {
    let promo = document.querySelector('#input-promo')
    let usedPromoArray = [];
    let promoArray = ["rs", "epam"]

    promo.addEventListener('input', function() {

      if (usedPromoArray.includes(this.value)) {
        return
      }

      if (promoArray.includes(this.value)) {
        
        usedPromoArray.push(this.value)



        const succcesContainer = document.querySelector('.succes-promo-container__car')
        const totalPrice = document.querySelector('.total-price__cart')

        const succesPromo = document.createElement('div')
        const promoList = document.createElement('div')
        const removePromo = document.createElement('button')
        const newPrice = document.createElement('div')

        succesPromo.classList.add(`succces-promo__cart`)
        succesPromo.classList.add(`${this.value}__cart`)
        promoList.classList.add('promo-list__cart')
        removePromo.classList.add('remove-promo__cart')
        totalPrice.classList.add('line-through')
        newPrice.classList.add('new-price__cart')
        
        succcesContainer.append(newPrice)
        succcesContainer.appendChild(succesPromo)
        succesPromo.appendChild(promoList)

        succesPromo.appendChild(removePromo)

        newPrice.innerHTML = `New price: ${this.totalPrice}`
        removePromo.innerHTML = "remove";
        promoList.innerHTML = this.value;

        removePromo.addEventListener('click', function() {
          succesPromo.remove();
          usedPromoArray.splice(this.value, 1);
          if(usedPromoArray.length == 0) {
            totalPrice.classList.remove('line-through')
          }
        })

        this.value  = '';
      }
    })
  }
}

export const cartPageComponent = new CartPageComponent({
    selector: 'app-cart-page',
    template: /*html*/`
      <div class="container__cart">

        <div class="products__cart">
          <div class="title-items__cart">
            <h2>Products in cart</h2>
            <div class="count-items__cart">Items: N</div>
            <div class="pages__cart">
              <div>page:</div>
              <div class="left-arrow__cart"> < </div>
              <div class="pages-num__cart">N</div>
              <div class="right-arrow__cart">></div>
            </div>
          </div>
          <div class="item-products__cart">
            
          </div>
        </div>
        
        <div class="order__cart">
          <div class="title-order__cart">Summary</div>
          <div class="total-products__cart">Products: N</div>
          <div class="total-price__cart">Total price: N</div> 
          <div class="test-promo__cart">Test promo: rs | epam</div>
          <div class="succes-promo-container__car">

          </div>
          <div class="promo__cart">
            <input id="input-promo" class="input-promo__cart" type="search" minlength="6" maxlength="6" placeholder="Enter promo code"/>
          </div>
          <button class="buy-now-button__cart">Buy now</button>
        </div>

      </div>
    `
})