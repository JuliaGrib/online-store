import { WFMComponent } from "../../framework/index";
import { productsList} from "../lists/products"

class AboutPageComponent extends WFMComponent {
  constructor(config){
      super(config)
  }

  actions() {
    return {
        'makeAbout': 'makeAbout',
    }
  }

  makeAbout() {
    let idPage = this.parseURL();

    let product = productsList.products.find((elem) => elem.id === idPage);

    const navigation = document.querySelector('.navigation__about')
    const title = document.querySelector('.title__product');
    const img = document.querySelector('.img__product');
    const description = document.querySelector('.description__product');
    const stock = document.querySelector('.stock__product');
    const brand = document.querySelector('.brand__product');
    const category = document.querySelector('.category__product');

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

  }

  parseURL() {
    let url = new URL(window.location);
    let id = url.hash.split('/')[1];
    return +id;
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
              <button class="add__product">add to cart</button>
              <button class="buy-now__product">buy now</button>
            </div>
          </div>
        </div>
      </div>
    `
})