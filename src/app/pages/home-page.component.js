import { WFMComponent } from "../../framework/index"
import { productsList} from "../lists/products"

class HomePageComponent extends WFMComponent {
    constructor(config){
        super(config)
    }

    visibleProducts = productsList.products;

    //действия сразу при запуске
    actions() {
        return {
            'makeProducts': 'makeProducts',
        }
    }

    //вставляет товар из списка productsList на сайт
    makeProducts(){

        let productsContainer = document.querySelector('.products__main');
        productsContainer.innerHTML = '';

        let url = new URL(window.location)

        if(url.search) {

          let params = new URLSearchParams(document.location.search);
          let search = params.get("search");
          let sort = params.get("sort");


          if(search == '') {
            this.clearQuery("search")
          } 

          if(sort) {
            if(sort === 'price-ASC') {
              this.visibleProducts.sort((x, y) => x.price - y.price)
              console.log(this.visibleProducts)
            } else if (sort === 'price-DESC') {
              this.visibleProducts.sort((x, y) => y.price - x.price)
              console.log(this.visibleProducts)
            }else if (sort === 'stock-ASC') {
              this.visibleProducts.sort((x, y) => x.stock - y.stock)
              console.log(this.visibleProducts)
            } else if (sort === 'stock-DESC') {
              this.visibleProducts.sort((x, y) => y.stock - x.stock)
              console.log(this.visibleProducts)
            }
          }

          if(search) {
            console.log("есть квери search")

            this.visibleProducts = productsList.products;

            let input = document.querySelector('.input-main__search')
            input.value = search

            let tempArray = [];
            for(let i = 0; i <  this.visibleProducts.length; i++) {
              
              let price =  this.visibleProducts[i].price;
              price = String(price);
              let stock =  this.visibleProducts[i].stock;
              stock = String(stock);
              let title =  this.visibleProducts[i].title.toLowerCase();
              let brand =  this.visibleProducts[i].brand.toLowerCase();
              let category =  this.visibleProducts[i].category.toLowerCase();
      
              let isIncludePrice = price.includes(search);
              let isIncludeStock = stock.includes(search);
              let isIncludeTitle = title.includes(search);
              let isIncludeBrand = brand.includes(search);
              let isIncludeCategory = category.includes(search);
              if(isIncludePrice || isIncludeStock || isIncludeTitle || isIncludeBrand || isIncludeCategory) {
                tempArray.push( this.visibleProducts[i])
              }
            }
            this.visibleProducts = tempArray;
            console.log(this.visibleProducts)
          }
        } 

        this.visibleProducts.forEach((elem, index) => {
            
            let productElem = document.createElement('div');
            let productImg = document.createElement('img');
            let titleItem = document.createElement('p');
            let priceContainer = document.createElement('div');
            let priceItem = document.createElement('p');
            let addItemBtn = document.createElement('a');
            let stockItem = document.createElement('div')

            productElem.classList.add('elem__item');
            priceContainer.classList.add('price__container');
            titleItem.classList.add('title__item');
            priceItem.classList.add('price__item');
            stockItem.classList.add('stock__item')
            addItemBtn.classList.add('add__item');


            productImg.src = elem.thumbnail;
            titleItem.innerHTML = elem.title;
            priceItem.innerHTML = `$${elem.price}`;
            addItemBtn.setAttribute('data-id', `${elem.id}`);
            addItemBtn.innerHTML = 'Add to cart';
            stockItem.innerHTML = `Stock: ${elem.stock}`;

            productsContainer.appendChild(productElem);
            productElem.appendChild(productImg);
            productElem.appendChild(titleItem);
            productElem.appendChild(priceContainer);
            priceContainer.appendChild(priceItem);
            priceContainer.appendChild(stockItem)
            priceContainer.appendChild(addItemBtn);

        })
    }

    //события
    events() {
        return {
            'click .add__item': 'addProductToLocal',
            'click .remove__item': 'removeProductToLocal',
            'input .input-main__search': 'searchProduct',
            'change .main__select-sort': 'sortProducts'
        }
    }

    makeQuery(key, value) {
      let url = new URL(window.location)
      url.searchParams.set(key, value)
      history.pushState(null, null, url);
    }

    clearQuery(key) {
      let url = new URL(window.location)
      url.searchParams.delete(key)
      history.pushState(null, null, url);
    }

    sortProducts(event) {

      if(event.target.value === "Sort by price (lowest to highest)") {
        this.makeQuery("sort", "price-ASC")
      } else if(event.target.value === "Sort by price (highest to lowest)") {
        this.makeQuery("sort", "price-DESC")
      } else if(event.target.value === "Sort by stock (lowest to highest)") {
        this.makeQuery("sort", "stock-ASC")
      } else if(event.target.value === "Sort by stock (highest to lowest)") {
        this.makeQuery("sort", "stock-DESC")
      }
      this.makeProducts();
    }

    searchProduct(event) {
      let value = event.target.value.toLowerCase();
      this.makeQuery("search", value)
      this.makeProducts();
    }


    addProductToLocal(event){

        //узнаем айди кнопки, на которую кликнули
        let currentId = event.target.dataset.id;

        //находим объект в продуктах, с тем же айди
        let currentItem = productsList.products.find(elem => elem.id == currentId);

        //достаем локальный объект с массивами товаров
        let localArr = JSON.parse( localStorage.productsLocal)

        //пушим туда наш объект
        localArr.products.push(currentItem);

        //перезаписываем измененный локал вместо старого
        localStorage.productsLocal = JSON.stringify(localArr);
    }

    //удаление пока не работает
    removeProductToLocal(event){
        let id = event.target.dataset.id;
        console.log(id)
    }


}

export const homePageComponent = new HomePageComponent({
    selector: 'app-home-page',
    template: /*html*/`
    <div class="banner__main"></div>
    <div class="container__main">
        <div class="sidebar__main">
            <div class="filter__main">
                <p class="filter__title">Categories</p>
                <ul>
                    <li><input type="checkbox" name="sofa" value="sofa">Sofa</li>
                    <li><input type="checkbox" name="armchair" value="armchair">Armchair</li>
                    <li><input type="checkbox" name="table" value="table">Table</li>
                    <li><input type="checkbox" name="chair" value="chair">Сhair</li>
                </ul>
            </div>
            <div class="filter__main">
                <p class="filter__title">Brand</p>
                <ul>
                    <li><input type="checkbox" name="viena" value="viena">Viena</li>
                    <li><input type="checkbox" name="numo" value="numo">Numo</li>
                    <li><input type="checkbox" name="dins" value="dins">Dins</li>
                    <li><input type="checkbox" name="abby" value="abby">Abby</li>
                </ul>
            </div>
        </div>
        <div class="main__content">
            <div class="main__info">
                <div class="main__select">
                    <select class="main__select-sort">
                        <option disabled selected >Sort options:</option>
                        <option>Sort by price (lowest to highest)</option>
                        <option>Sort by price (highest to lowest)</option>
                        <option>Sort by stock (lowest to highest)</option>
                        <option>Sort by stock (highest to lowest)</option>
                    </select>
                </div>
                <div class="main__search">
                    <input class="input-main__search" type="search" placeholder="Search"></input>
                </div>
                <div class="main__width">
                    View
                </div>
            </div>
            <div class="products__main"></div>
        </div>
    </div>
    `
})


