import { WFMComponent } from "../../framework/index";
import { buyNow } from "./cart-page.utils/modal";
import { paginator } from "./cart-page.utils/paginator"
import { usedPromo } from "./cart-page.utils/used-promo"
import { headerCounter } from "../common/header.utils/counter"
import { IConfigComponent, IProduct, IProductList } from "../../types";

class CartPageComponent extends WFMComponent {
  constructor(config: IConfigComponent){
      super(config)
  }
  //глобальный объект продуктов в корзине
  arrayProducts: IProductList  = {
    products: []
  };
  //глобальный счетчик кол-ва подуктов для каждого отдельного продукта в корзине
  countOnceItem: (string | number)[] = [];
  //общая сумма 
  totalPriceN = 0;
  //новая цена после применения промокода
  totalNewPrice = 0;
  //общее кол-во оваров
  totalProducts = 0;
  //массив неповторяющихся продуктов = arrayProducts.products
  tempArrayProducts: Array<IProduct> = [];

  actions() {
    return {
        'makeCart': 'makeCart',
    }
  }

  events() {
    return {
        'input #input-promo' : 'checkPromo',
        'click .buy-now-button__cart' : 'buyNowWrap',
    }
  }

  makeCart() {
    const productsCart = (document.querySelector('.item-products__cart')) as HTMLElement
    productsCart.innerHTML = ''
    this.arrayProducts = JSON.parse(localStorage.productsLocal);
    //проверяем не пустая ли корзина
    if(this.arrayProducts.products.length == 0) {
      const container = (document.querySelector('.container__cart')) as HTMLElement
      container.innerHTML = /*html*/`
      <div class="empty__cart">
        <h2>CART IS EMPTY</h2>
        <a class="main-link__cart" href="/">⟵ Go back to the main page</a>
      </div>
      `
      return
    }
    //создаем массив с колличеством каждого одинакого элемента 
    // eslint-disable-next-line
    this.countOnceItem = this.arrayProducts.products.reduce(function(acc: any, el: IProduct) {
      acc[el.id] = (acc[el.id] || 0) + 1;
      return acc;
    }, {});
    //фильтруем повторяющиееся элементы 
    // eslint-disable-next-line
    this.tempArrayProducts = this.arrayProducts.products.reduce((acc: any, el: IProduct) => {
      // eslint-disable-next-line
      if (!acc.find((v: any) => v.id == el.id)) {
        acc.push(el);
      }
      return acc;
    }, []); 

    const params = new URLSearchParams(document.location.search);

    if(params.get('buy')) {
      buyNow();
      headerCounter();
    }
    const countProductsCart = (document.querySelector('.count-items__cart')) as HTMLElement
    const totalProductsCart = (document.querySelector('.total-products__cart')) as HTMLElement
    const totalPriceCart = (document.querySelector('.total-price__cart')) as HTMLElement
    countProductsCart.innerHTML = `Items: ${this.tempArrayProducts.length}`
    this.totalPriceN = 0;
    this.totalProducts = 0;
    //перебираем массива неповторяющихся продуктов и создаем из него DOM
    this.tempArrayProducts.forEach((elem, index) => {
      const idProduct = +elem.id
      const priceProduct = +elem.price
      const itemCart = document.createElement('div');
      const idItem = (document.createElement('div')) as HTMLElement
      const infoItem = document.createElement('div');
      const imgItem = document.createElement('img');
      const detailItem = document.createElement('div');
      const categoryItem = document.createElement('div')
      const nameItem = document.createElement('div');
      const descriptionItem = document.createElement('div');
      const additionalItem = document.createElement('div');
      const countItemContainer = document.createElement('div');
      const countItem = document.createElement('div');
      const addItem = document.createElement('button');
      const removeItem = document.createElement('button');
      const priceItem = document.createElement('div');
      const stockItem = document.createElement('div')
      
      itemCart.classList.add(`display-none`)
      itemCart.classList.add(`item__cart`)
      itemCart.classList.add(`item-${elem.id}__cart`)
      idItem.classList.add('id-item__cart')
      infoItem.classList.add('info-item__cart')
      imgItem.classList.add('img-item__cart')
      detailItem.classList.add('detail-item__cart')
      categoryItem.classList.add('category-item__cart')
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

      idItem.innerHTML = `${index+1}`;
      imgItem.src = elem.thumbnail;
      categoryItem.innerHTML = elem.category;
      nameItem.innerHTML = elem.title;
      descriptionItem.innerHTML = elem.description
      countItem.innerHTML = `${this.countOnceItem[idProduct]}`
      addItem.innerHTML = '+'
      removeItem.innerHTML = '-'
      priceItem.innerHTML = `${priceProduct * +this.countOnceItem[idProduct]}$`
      stockItem.innerHTML = `Stock: ${elem.stock}`

      productsCart.appendChild(itemCart);
      itemCart.appendChild(idItem);
      itemCart.appendChild(infoItem);
      itemCart.appendChild(additionalItem);
      infoItem.appendChild(imgItem);
      infoItem.appendChild(detailItem);
      detailItem.appendChild(categoryItem);
      detailItem.appendChild(nameItem);
      detailItem.appendChild(descriptionItem);
      additionalItem.appendChild(stockItem)
      additionalItem.appendChild(countItemContainer)
      additionalItem.appendChild(priceItem)
      countItemContainer.appendChild(addItem)
      countItemContainer.appendChild(countItem)
      countItemContainer.appendChild(removeItem)

      const totalItemPrice = elem.price * +this.countOnceItem[idProduct]
      this.totalPriceN = this.totalPriceN + totalItemPrice
      this.totalProducts = this.totalProducts + +this.countOnceItem[idProduct]
      this.totalNewPrice =  this.totalPriceN
    })
    //выводи общее кол-во товаров и цену
    totalPriceCart.innerHTML = `Total price: ${this.totalPriceN}$`
    totalProductsCart.innerHTML = `Products: ${this.totalProducts}`;
    //проверяем есть ли у нас примененные промокода,если да, то выводим их
    if(localStorage.usedPromo) usedPromo();
    //создаем пагинатор
    paginator();

    const addItem = document.querySelectorAll('.add-item__cart');
    const removeItem = document.querySelectorAll('.remove-item__cart')

    //добавляем кол-во товара
    addItem.forEach((elem) => {
      // eslint-disable-next-line
      elem.addEventListener('click', (event: any) => {
        const target: HTMLElement = event.target
        const currentId: number = +target.dataset.id
        const currentItem = this.arrayProducts.products.find((elem) => elem.id == currentId);
        
        //проверяем что бы кол-во товара не было больше чем на складе
        if((this.countOnceItem[currentId]) === currentItem.stock) {
          return
        }
        //пушим в локалсторадж
        const localArr = JSON.parse( localStorage.productsLocal)
        localArr.products.push(currentItem);
        localStorage.productsLocal = JSON.stringify(localArr);
        headerCounter();
        ////////////////Обновляем цену и счетчикпродуктов в корзине//////////////
        const countItem = (document.querySelector(`.count-item-${currentId}__cart`)) as HTMLElement
        const priceItem = (document.querySelector(`.price-item-${currentId}__cart`)) as HTMLElement
        const totalPriceCart = (document.querySelector('.total-price__cart')) as HTMLElement
        const totalProductsCart = (document.querySelector('.total-products__cart')) as HTMLElement
        
        let count = +this.countOnceItem[currentId]
        count++
        this.countOnceItem[currentId] = count

        countItem.innerHTML = `${this.countOnceItem[currentId]}`
        priceItem.innerHTML = `${currentItem.price * +this.countOnceItem[currentId]}$`
        this.totalPriceN = this.totalPriceN + currentItem.price
        this.totalProducts++;
        totalPriceCart.innerHTML = `Total price: ${this.totalPriceN}$`
        totalProductsCart.innerHTML = `Products: ${this.totalProducts}`;
        ////////////////////////////////////////////////////////////////////////////
      })
    })
    //удаляем товар
    removeItem.forEach((elem) => {
      // eslint-disable-next-line
      elem.addEventListener('click', (event: any) => {
        const currentId = event.target.dataset.id
        const currentItem = this.arrayProducts.products.find((elem: IProduct) => elem.id == currentId);
        const indexItem = this.arrayProducts.products.indexOf(currentItem)
        //удаляем из локалстораджа
        const localArr = JSON.parse( localStorage.productsLocal)
        localArr.products.splice(indexItem, 1);
        localStorage.productsLocal = JSON.stringify(localArr);
        headerCounter();
        //обновляем DOM
        const countItem = (document.querySelector(`.count-item-${currentId}__cart`)) as HTMLElement
        const priceItem = (document.querySelector(`.price-item-${currentId}__cart`)) as HTMLElement
        const totalPriceCart = (document.querySelector('.total-price__cart')) as HTMLElement
        const totalProductsCart = (document.querySelector('.total-products__cart')) as HTMLElement
    
        let count = +this.countOnceItem[currentId]
        count--
        this.countOnceItem[currentId] = count
        //Проверяем если пустая карзина, то
        if(localArr.products.length == 0) {
          const container = (document.querySelector('.container__cart')) as HTMLElement
          container.innerHTML = /*html*/`
            <div class="empty__cart">
              <h2>CART IS EMPTY</h2>
              <a class="main-link__cart" href="/">⟵ Go back to the main page</a>
            </div>
          `
          const url = new URL(window.location.href)
          url.searchParams.delete("page")
          history.pushState(null, '', url);
          return
        }
        
        if(this.countOnceItem[currentId] == 0) {
          this.tempArrayProducts.splice(indexItem, 1);
          let currentPage = JSON.parse(localStorage.currentPage)
          if(localArr.products.length == currentPage * 3) {
            currentPage--;
            localStorage.currentPage = JSON.stringify(currentPage)
            const url = new URL(window.location.href)
            url.searchParams.set('page', currentPage+1)
            history.pushState(null, '', url);
            this.makeCart();
          }
        }
        countItem.innerHTML = `${this.countOnceItem[currentId]}`
        priceItem.innerHTML = `${currentItem.price * +this.countOnceItem[currentId]}$`
        this.totalPriceN = this.totalPriceN - currentItem.price
        totalPriceCart.innerHTML = `Total price: ${this.totalPriceN}$`
        this.totalProducts--;
        totalProductsCart.innerHTML = `Products: ${this.totalProducts}`;
        this.makeCart();
      })
    })
    
    const dropPromo = (document.querySelectorAll('.remove-code__cart')) 
    const applieidPromo = (document.querySelector('.applied-promo__cart')) as HTMLElement

    if(dropPromo) {
      const totalPrice = (document.querySelector('.total-price__cart'))as HTMLElement
      const newPrice = (document.querySelector('.new-price__cart'))as HTMLElement
      dropPromo.forEach((elem) => {
        // eslint-disable-next-line
        elem.addEventListener('click', (event: any) => {
          const target: HTMLInputElement = event.target
          const arrayUsedPromo = JSON.parse(localStorage.usedPromo)
          applieidPromo.remove();
          arrayUsedPromo.splice(target.value, 1);
          localStorage.usedPromo = JSON.stringify(arrayUsedPromo);
          this.totalNewPrice = this.totalNewPrice + Math.round(this.totalNewPrice * 0.1)
          newPrice.innerHTML = `New price: ${this.totalNewPrice }`
          if(arrayUsedPromo.length == 0) {
            localStorage.removeItem('usedPromo');
            totalPrice.classList.remove('line-through')
            newPrice.classList.remove('display-flex')
            const appliedPromoContainer = (document.querySelector('.applied-promo-container__cart')) as HTMLElement
            appliedPromoContainer.innerHTML = ''
            appliedPromoContainer.classList.remove('display-block')
          }
        })
      })

    }
  }
  
  buyNowWrap() {
    buyNow();
  }
  
  checkPromo(event: InputEvent) {
    // eslint-disable-next-line
    const target: any = event.target
    let value = target.value;
    let usedPromoArray: string[] = []
    //проверяем если в локалсторадже есть промокоды, то забираем их
    if(localStorage.usedPromo) {
      usedPromoArray = JSON.parse(localStorage.usedPromo);
    }
    const promoArray = ["rs", "epam"]

    if (usedPromoArray.includes(value)) {
      return;
    }
      
    if (promoArray.includes(value)) {
      usedPromoArray.push(value)
      const succcesContainer = (document.querySelector('.succes-promo-container__car')) as HTMLElement
      const succesPromo = document.createElement('div')
      const promoList = document.createElement('div')
      const addPromo = document.createElement('button')
      succesPromo.classList.add(`succces-promo__cart`)
      succesPromo.classList.add(`${value}__cart`)
      promoList.classList.add('promo-list__cart')
      addPromo.classList.add('add-promo__cart')
      succcesContainer.appendChild(succesPromo) 
      succesPromo.appendChild(promoList)
      succesPromo.appendChild(addPromo)
      addPromo.innerHTML = 'Add'
      promoList.innerHTML = `Promo: "${value}", your discont: 10%`;

      addPromo.addEventListener('click', () => {
        localStorage.usedPromo = JSON.stringify(usedPromoArray);
        addPromo.remove()
        promoList.remove()
        this.totalPriceN = this.totalPriceN - Math.ceil(this.totalPriceN * 0.1)
        this.makeCart();
      })
      value  = '';
    }
  }
}

export const cartPageComponent: CartPageComponent = new CartPageComponent({
    selector: 'app-cart-page',
    template: /*html*/`
    <div class="vertical__text">New Arrival</div>
      <div class="wrapper__main">

          <div class="container__cart">

          <div class="products__cart">
            <div class="title-items__cart">
              <h2>Products in cart</h2>
              <div class="count-items__cart">Items: N</div>
              <div class="pages__cart"></div>
            </div>
            <div class="item-products__cart"></div>
          </div>
          
          <div class="order__cart">
            <div class="title-order__cart">Summary</div>
            <div class="total-products__cart">Products: N</div>
            <div class="total-price__cart">Total price: N</div> 
            <div class="applied-promo-container__cart"></div>
            <div class="new-price__cart">N</div> 
            <div class="test-promo__cart">Test promo: rs | epam</div>
            <div class="succes-promo-container__car"></div>
            <div class="promo__cart">
              <input id="input-promo" class="input-promo__cart" type="search" minlength="6" maxlength="6" placeholder="Enter promo code"/>
            </div>
            <button class="buy-now-button__cart">Buy now</button>

          </div>
        </div>
      </div>
    `
})