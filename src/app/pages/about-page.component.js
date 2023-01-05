import { WFMComponent } from "../../framework/index";
import { productsList} from "../lists/products"
import { parseURL } from './about-page.utils/parse-url'

class AboutPageComponent extends WFMComponent {
  constructor(config){
      super(config)
  }

  actions() {
    return {
        'makeAbout': 'makeAbout',
    }
  }

  events() {
    return {
      'click .add__product': 'addToCart',
      'click .buy-now__product': 'buyNow',
      'click .drop__product': 'dropFromCart'
    }
  }

  makeAbout() {

    let idPage = parseURL();

    let product = productsList.products.find((elem) => elem.id === idPage);

    const navigation = document.querySelector('.navigation__about')
    const title = document.querySelector('.title__product');
    const img = document.querySelector('.img__product');
    const description = document.querySelector('.description__product');
    const stock = document.querySelector('.stock__product');
    const brand = document.querySelector('.brand__product');
    const category = document.querySelector('.category__product');
    const price = document.querySelector('.price__product')
    const add = document.querySelector('.add__product')
    const drop = document.querySelector('.drop__product')

    navigation.innerHTML = `
      STORE >>>
      ${product.category.toUpperCase()} >>> 
      ${product.brand.toUpperCase()} >>> 
      ${product.title}
    `
    title.innerHTML = product.title;
    img.src = product.thumbnail;
    description.innerHTML = product.description;
    stock.innerHTML = `Stock: ${product.stock}`;
    brand.innerHTML = `Brand: ${product.brand}`;
    category.innerHTML = `Category: ${product.category}`;
    price.innerHTML = `Price: ${product.price}$`

    add.setAttribute('data-id', `${product.id}`)
    drop.setAttribute('data-id', `${product.id}`)
    this.isInCart();
  }

  addToCart(event) {
    const add = document.querySelector('.add__product')
    const drop = document.querySelector('.drop__product')
    let currentId = event.target.dataset.id
    let currentItem = productsList.products.find(elem => elem.id == currentId)
    let localArr = JSON.parse( localStorage.productsLocal)
    localArr.products.push(currentItem);
    localStorage.productsLocal = JSON.stringify(localArr);
    add.style.color = "red"
    setTimeout(() => {
      add.style.color = "black"
      add.classList.remove('display-block')
      add.classList.add('display-none')
      drop.classList.remove('display-none')
      drop.classList.add('display-block')
    }, 300)

  }

  dropFromCart(event) {
    const add = document.querySelector('.add__product')
    const drop = document.querySelector('.drop__product')
    let localArr = JSON.parse(localStorage.productsLocal)
    let currentId = event.target.dataset.id
    let currentItem = localArr.products.find(elem => elem.id == currentId);
    let indexItem = localArr.products.indexOf(currentItem)
    let count = 0
    for(let elem of localArr.products) {
      if(elem.id == currentId) {
        count++
      }
    }
    localArr.products.splice(indexItem, count);
    localStorage.productsLocal = JSON.stringify(localArr);
    drop.style.color = "red"
    setTimeout(() => {
      drop.style.color = "black"
      drop.classList.remove('display-block')
      drop.classList.add('display-none')
      add.classList.remove('display-none')
      add.classList.add('display-block')
    }, 300)
  }

  buyNow() {
    let id = parseURL();
    let localArr = JSON.parse(localStorage.productsLocal)
    if(!localArr.products.find(elem => elem.id == id)) {
      let currentItem = productsList.products.find(elem => elem.id == id)
      localArr.products.push(currentItem);
      localStorage.productsLocal = JSON.stringify(localArr);
    }
    document.location='?buy=da#cart'
  }

  isInCart() {
    const add = document.querySelector('.add__product')
    const drop = document.querySelector('.drop__product')
    let id = add.dataset.id
    let localArr = JSON.parse(localStorage.productsLocal)
    if(localArr.products.find(elem => elem.id == id)) {
      add.classList.remove('display-block')
      add.classList.add('display-none')
      drop.classList.remove('display-none')
      drop.classList.add('display-block')
    } 
  }

}

export const aboutPageComponent = new AboutPageComponent({
    selector: 'app-about-page',
    template: /*html*/`
      <div class="container__about">
        <div class="navigation__about">STORE>>LAPTOPS>>APPLE>>MACBOOK PRO</div>
        <div class="product__about">
          <div class="title__product">Title</div>
          <div class="data__product">
            <img class="img__product" alt="img" />
            <div class="info__product">
              <div class="description__product">description</div>
              <div class="stock__product">stock</div>
              <div class="brand__product">brand</div>
              <div class="category__product">category</div>
            </div>
            <div class="add-to-cart__product">
              <div class="price__product">price</div>
              <button class="add__product display-block">add to cart</button>
              <button class="drop__product display-none">drop from cart</button>
              <button class="buy-now__product">buy now</button>
            </div>
          </div>
        </div>
      </div>
    `
})