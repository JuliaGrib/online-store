import { WFMComponent } from "../../framework/index";
import { productsList} from "../lists/products"
import { parseURL } from './about-page.utils/parse-url'
import { headerCounter } from "../common/header.utils/counter"
import { IConfigComponent } from "../../types/index";

class AboutPageComponent extends WFMComponent {
  constructor(config: IConfigComponent){
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

    const idPage: number = parseURL();
    const product = productsList.products.find((elem: { id: number; }) => elem.id === idPage);
    const navigation = (document.querySelector('.navigation__about')) as HTMLElement
    const title = (document.querySelector('.title__product')) as HTMLElement
    const img = (document.querySelector('.img__product')) as HTMLImageElement
    const description = (document.querySelector('.description__product')) as HTMLElement
    const stock = (document.querySelector('.stock__product')) as HTMLElement
    const brand = (document.querySelector('.brand__product')) as HTMLElement
    const category = (document.querySelector('.category__product')) as HTMLElement
    const price = (document.querySelector('.price__product')) as HTMLElement
    const add = (document.querySelector('.add__product')) as HTMLButtonElement
    const drop = (document.querySelector('.drop__product')) as HTMLButtonElement
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    navigation.innerHTML = `STORE / ${product!.category.toUpperCase()} / ${product!.brand.toUpperCase()} /  ${product!.title}`
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    title.innerHTML = product!.title;
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    img.src = product!.images[0];
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    description.innerHTML = product!.description;
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    stock.innerHTML = `Stock: ${product!.stock}`;
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    brand.innerHTML = `Brand: ${product!.brand}`;
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    category.innerHTML = `Category: ${product!.category}`;
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    price.innerHTML = `Price: ${product!.price}$`
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    add.setAttribute('data-id', `${product!.id}`)
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    drop.setAttribute('data-id', `${product!.id}`)
    this.isInCart();
  }

  addToCart(event: { target: { dataset: { id: string; }; }; }) {
    const add = (document.querySelector('.add__product')) as HTMLButtonElement
    const drop = (document.querySelector('.drop__product')) as HTMLButtonElement
    const currentId = +event.target.dataset.id
    const currentItem = productsList.products.find((elem: { id: number; }) => elem.id == currentId)
    const localArr = JSON.parse( localStorage.productsLocal)
    localArr.products.push(currentItem);
    localStorage.productsLocal = JSON.stringify(localArr);
    add.style.color = "red"
    headerCounter();
    setTimeout(() => {
      add.style.color = "black"
      add.classList.remove('display-block')
      add.classList.add('display-none')
      drop.classList.remove('display-none')
      drop.classList.add('display-block')
    }, 300)

  }

  dropFromCart(event: { target: { dataset: { id: string; }; }; }) {
    const add = (document.querySelector('.add__product')) as HTMLButtonElement
    const drop = (document.querySelector('.drop__product')) as HTMLButtonElement
    const localArr = JSON.parse(localStorage.productsLocal)
    const currentId = +event.target.dataset.id
    const currentItem = localArr.products.find((elem: { id: number; }) => elem.id == currentId);
    const indexItem = localArr.products.indexOf(currentItem)
    let count = 0
    for(const elem of localArr.products) {
      if(elem.id == currentId) {
        count++
      }
    }
    localArr.products.splice(indexItem, count);
    localStorage.productsLocal = JSON.stringify(localArr);
    headerCounter();
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
    const id = parseURL();
    const localArr = JSON.parse(localStorage.productsLocal)
    if(!localArr.products.find((elem: { id: number; }) => elem.id == id)) {
      const currentItem = productsList.products.find((elem: { id: number; }) => elem.id == id)
      localArr.products.push(currentItem);
      localStorage.productsLocal = JSON.stringify(localArr);
      headerCounter();
    }
    document.location='?buy=da#cart'
  }

  isInCart() {
    const add = (document.querySelector('.add__product')) as HTMLButtonElement
    const drop = (document.querySelector('.drop__product')) as HTMLButtonElement
    const id = +add.dataset.id
    const localArr = JSON.parse(localStorage.productsLocal)
    if(localArr.products.find((elem: { id: number; }) => elem.id == id)) {
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
      <div class="wrapper__main">
          
          <div class="container__about">
          <div class="navigation__about">STORE / LAPTOPS / APPLE / MACBOOK PRO</div>
          <div class="product__about">
            
            <div class="data__product">
              <img class="img__product" alt="img" />
              <div class="info__product">
              <div class="title__product">Title</div>
       
                
                
                <div class="brand__product">brand</div>
                <div class="category__product">category</div>
                <div class="description__product">description</div>
                <div class="add-to-cart__product">
                <div class="price__product">price</div>
                <div class="stock__product">stock</div>
                
                <div class="product__btn">
                  <button class="add__product display-block">add to cart</button>
                  <button class="drop__product display-none">drop from cart</button>
                  <button class="buy-now__product">buy now</button>
                </div>
              </div>
              </div>
              
            </div>
          </div>
        </div>
      
      </div>
      <footer>
      <div class="wrapper__content">
        <div class="footer__content">
            <div class="members">
            <a href="https://github.com/231globus">231globus</a>
            <a href="https://github.com/JuliaGrib">JuliaGrib</a>
            </div>
            <div class="date">2023</div>
            <div class="rs">
              <a href="https://rs.school/">
                <img src="../assets/main/rs_school.svg">
              </a>
            </div>         
        </div>      
      </div>     
    </footer>
    `
})