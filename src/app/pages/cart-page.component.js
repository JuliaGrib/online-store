import { WFMComponent } from "../../framework/index";
import { productsList} from "../lists/products"

class CartPageComponent extends WFMComponent {
  constructor(config){
      super(config)
  }

  arrayProducts = {};
  countOnceItem = [];
  totalPrice = 0;

  actions() {
    return {
        'makeCart': 'makeCart',
    }
  }

  events() {
    return {
        'click .add-item__cart': 'addProductToCart',
        'click .remove-item__cart': 'removeProductFromCart',
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
    const productsCart = document.querySelector('.item-products__cart');
    const countProductsCart = document.querySelector('.count-items__cart');
    const pageNumCart = document.querySelector('.pages-num__cart')
    const totalProductsCart = document.querySelector('.total-products__cart')
    const totalPriceCart = document.querySelector('.total-price__cart')

    countProductsCart.innerHTML = `Items: ${tempArrayProducts.length}`
    pageNumCart.innerHTML = tempArrayProducts.length%2;
    totalProductsCart.innerHTML = `Products: ${tempArrayProducts.length}`;

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

      itemCart.classList.add('item__cart')
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

      productsCart.appendChild(itemCart);

      itemCart.appendChild(idItem);
      itemCart.appendChild(infoItem);
      itemCart.appendChild(additionalItem);

      infoItem.appendChild(imgItem);
      infoItem.appendChild(detailItem);

      detailItem.appendChild(nameItem);
      detailItem.appendChild(descriptionItem);

      additionalItem.appendChild(countItemContainer)
      additionalItem.appendChild(priceItem)

      countItemContainer.appendChild(addItem)
      countItemContainer.appendChild(countItem)
      countItemContainer.appendChild(removeItem)

      let totalItemPrice = elem.price * this.countOnceItem[idProduct]


      this.totalPrice = this.totalPrice + totalItemPrice

    })
    console.log(this.totalPrice)
    totalPriceCart.innerHTML = `Total price: ${this.totalPrice}$`
  }

  addProductToCart(event) {


    let currentId = event.target.dataset.id
    let currentItem = productsList.products.find(elem => elem.id == currentId);
    let localArr = JSON.parse( localStorage.productsLocal)
    localArr.products.push(currentItem);
    localStorage.productsLocal = JSON.stringify(localArr);
    const countItem = document.querySelector(`.count-item-${currentId}__cart`);
    const priceItem = document.querySelector(`.price-item-${currentId}__cart`);
    this.countOnceItem[currentId]++
    countItem.innerHTML = this.countOnceItem[currentId];
    priceItem.innerHTML = `${currentItem.price * this.countOnceItem[currentId]}$`
  }

  removeProductFromCart(event) {
    let currentId = event.target.dataset.id
    let currentItem = productsList.products.find(elem => elem.id == currentId);
    let indexItem = productsList.products.indexOf(currentItem)
    let localArr = JSON.parse( localStorage.productsLocal)
    localArr.products.splice(indexItem, 1);
    
    localStorage.productsLocal = JSON.stringify(localArr);

    if(localArr.products.length == 0) {
      this.makeCart();
    }

    const countItem = document.querySelector(`.count-item-${currentId}__cart`);
    const priceItem = document.querySelector(`.price-item-${currentId}__cart`);
    this.countOnceItem[currentId]--
    countItem.innerHTML = this.countOnceItem[currentId];
    priceItem.innerHTML = `${currentItem.price * this.countOnceItem[currentId]}$`
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
          <div class="promo__cart">
            <input class="input-promo__cart" type="search" placeholder="Enter promo code"/>
          </div>
          <button class="buy-now__cart">Buy now</button>
        </div>

      </div>
    `
})