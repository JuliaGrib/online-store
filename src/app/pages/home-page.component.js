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
    //события
    events() {
      return {
          'click .add__item': 'addProductToLocal',
          'click .remove__item': 'removeProductToLocal',
          'input .input-main__search': 'searchProduct',
          'change .main__select-sort': 'sortProducts',
          'input #slider-1': 'firstSlider',
          'input #slider-2': 'secondSlider',
          'input #stock-slider-1': 'firstStockSlider',
          'input #stock-slider-2': 'secondStockSlider',
          'change .filter__main': 'filterProducts'
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
          let price = params.get("price");
          let stock = params.get("stock");
          let category = params.get("category");
          let brand = params.get("brand")

          if(search == '') this.clearQuery("search")
          if(category == '') this.clearQuery("category")
          if(brand == '') this.clearQuery("brand")

          this.filterReload(category)
          this.filterReload(brand)

          if(stock) {
            this.visibleProducts = productsList.products;
            let min = +stock.split('↕')[0]
            let max = +stock.split('↕')[1]
            let tempArray = this.visibleProducts.filter( elem => elem.stock >= min && elem.stock <= max)
            this.visibleProducts = tempArray;
          }

          if(price) {
            this.visibleProducts = productsList.products;
            let min = +price.split('↕')[0]
            let max = +price.split('↕')[1]
            let tempArray = this.visibleProducts.filter( elem => elem.price >= min && elem.price <= max)
            this.visibleProducts = tempArray;
          }

          if(sort) {
            const options = document.querySelectorAll("option")
            options.forEach((elem) => {
              if(elem.dataset.id == sort) {
                elem.selected = true;
              }
            })

            if(sort === 'price-ASC') {
              this.visibleProducts.sort((x, y) => x.price - y.price)
            } else if (sort === 'price-DESC') {
              this.visibleProducts.sort((x, y) => y.price - x.price)
            }else if (sort === 'stock-ASC') {
              this.visibleProducts.sort((x, y) => x.stock - y.stock)
            } else if (sort === 'stock-DESC') {
              this.visibleProducts.sort((x, y) => y.stock - x.stock)
            }
          }

          if(search) {

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
          }
        } 

        this.visibleProducts.forEach((elem, index) => {
            
            let productElem = document.createElement('div');
            let productImg = document.createElement('img');
            let titleItem = document.createElement('a');
            let priceContainer = document.createElement('div');
            let priceItem = document.createElement('p');
            let addItemBtn = document.createElement('a');
            let stockItem = document.createElement('div');

            productElem.classList.add('elem__item');
            priceContainer.classList.add('price__container');
            titleItem.classList.add('title__item');
            priceItem.classList.add('price__item');
            stockItem.classList.add('stock__item')
            addItemBtn.classList.add('add__item');

            let range1 = document.querySelector('#range-1');
            let range2 = document.querySelector('#range-2');
            let slider1 = document.querySelector('#slider-1');
            let slider2 = document.querySelector('#slider-2');
            let stockSlider1 = document.querySelector('#stock-slider-1');
            let stockSlider2 = document.querySelector('#stock-slider-2');

            slider1.min = "366";
            slider1.max = "2565";
            slider2.min = "366";
            slider2.max = "2565";

            stockSlider1.min = "5";
            stockSlider1.max = "30";
            stockSlider2.min = "5";
            stockSlider2.max = "30";

            range1.innerHTML = this.minPriceProducts();
            range2.innerHTML = this.maxPriceProducts();

            productImg.src = elem.thumbnail;
            titleItem.href = `#about-product/${elem.id}`;
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

    filterProducts(event) {
      let target = event.target;
      if (target.tagName === 'INPUT' && target.type === 'checkbox') {
        if(target.classList  == 'category') 
          this.filterBy('category', event)
        if(target.classList  == 'brand') 
          this.filterBy('brand', event)
      }
    }

    filterBy(selector, event) {
      let target = event.target;
      let params = new URLSearchParams(document.location.search);
      let key = params.get(selector)
      if(params.get(selector)) {
        if(!target.checked) {
          let t = key.split('↕');
          let i = t.indexOf(target.value);
          t.splice(i, 1)
          key = t.join('↕')
        } else{
          key = key + '↕' + target.value
        }
      } else{
        key = target.value
      }
      this.makeQuery(selector, key);
      this.makeProducts();
    }

    filterReload(selector) {
      if(selector) {
        this.visibleProducts = productsList.products;
        let keyArray = selector.split('↕');
        let tempArray = []
        for(let i = 0; i < this.visibleProducts.length; i++) {
          for(let j = 0; j < keyArray.length; j++) {
            if(this.visibleProducts[i].category.toLowerCase() == keyArray[j] ||
               this.visibleProducts[i].brand.toLowerCase() == keyArray[j]) {
              tempArray.push(this.visibleProducts[i])
            }
          }
        }
        const checkboxes = document.querySelectorAll('input[type=checkbox]')
        checkboxes.forEach((elem) => {
          if(keyArray.includes(elem.value)) {
            elem.checked = true
          }
        })
        this.visibleProducts = tempArray;
      }
    }

    minPriceProducts() {
      let priceArray = []
      for(let i = 0; i < this.visibleProducts.length; i++ ) {
        priceArray.push(this.visibleProducts[i].price)
      }
      return Math.min.apply(null, priceArray)
    }

    maxPriceProducts() {
      let priceArray = []
      for(let i = 0; i < this.visibleProducts.length; i++ ) {
        priceArray.push(this.visibleProducts[i].price)
      }
      return Math.max.apply(null, priceArray)
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
      if(!url.search) {
        this.visibleProducts = productsList.products;
      }
    }

    firstSlider() {

      let minGap = 15;

      const slider1 = document.querySelector('#slider-1')
      const slider2 = document.querySelector('#slider-2')

      if(parseInt(slider2.value) - parseInt(slider1.value) <= minGap) {
        slider1.value = parseInt(slider2.value) - minGap;
      }

      this.makeQuery('price', `${slider1.value}↕${slider2.value}`)
      this.makeProducts();
    }

    secondSlider() {

      let minGap = 15;
      const slider1 = document.querySelector('#slider-1')
      const slider2 = document.querySelector('#slider-2')
      if(parseInt(slider2.value) - parseInt(slider1.value) <= minGap) {
        slider2.value = parseInt(slider1.value) + minGap;
      }
      this.makeQuery('price', `${slider1.value}↕${slider2.value}`)
      this.makeProducts();
    }


    firstStockSlider() {

      let minGap = 1;

      const stockSlider1 = document.querySelector('#stock-slider-1')
      const stockSlider2 = document.querySelector('#stock-slider-2')

      if(parseInt(stockSlider2.value) - parseInt(stockSlider1.value) <= minGap) {
        stockSlider1.value = parseInt(stockSlider2.value) - minGap;
      }

      this.makeQuery('stock', `${stockSlider1.value}↕${stockSlider2.value}`)
      this.makeProducts();
    }

    secondStockSlider() {

      let minGap = 1;

      const stockSlider1 = document.querySelector('#stock-slider-1')
      const stockSlider2 = document.querySelector('#stock-slider-2')

      if(parseInt(stockSlider2.value) - parseInt(stockSlider1.value) <= minGap) {
        stockSlider2.value = parseInt(stockSlider1.value) + minGap;
      }

      this.makeQuery('stock', `${stockSlider1.value}↕${stockSlider2.value}`)
      this.makeProducts();

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
                <ul class="checkbox-category__main">
                    <li><input class="category"  type="checkbox" name="sofa" value="sofa">Sofa</li>
                    <li><input class="category" type="checkbox" name="armchair" value="armchair">Armchair</li>
                    <li><input class="category" type="checkbox" name="table" value="table">Table</li>
                    <li><input class="category" type="checkbox" name="chair" value="chair">Сhair</li>
                </ul>
            </div>
            <div class="filter__main">
                <p class="filter__title">Brand</p>
                <ul>
                    <li><input class="brand" type="checkbox" name="viena" value="viena">Viena</li>
                    <li><input class="brand" type="checkbox" name="numo" value="numo">Numo</li>
                    <li><input class="brand" type="checkbox" name="dins" value="dins">Dins</li>
                    <li><input class="brand" type="checkbox" name="abby" value="abby">Abby</li>
                </ul>
            </div>
            <div class="multi-range__main">
              <h3>Price</h3>
              <div class="price-range__main">
                <span id="range-1"></span>
                <span>&dash;</span>
                <span id="range-2"></span>
              </div>
              <div class="input-range__main">
                <div class="slider-track"></div>
                <input class="slider" type="range" value="366" max="2565" id="slider-1" />
                <input class="slider" type="range" value="2565" max="2565" id="slider-2" />
              </div>
            </div>
            <div class="multi-range__main">
              <h3>Stock</h3>
              <div class="price-range__main">
                <span id="stock-range-1"></span>
                <span>&dash;</span>
                <span id="stock-range-2"></span>
              </div>
              <div class="input-range__main">
                <div class="slider-track"></div>
                <input class="slider" type="range" value="5" max="30" id="stock-slider-1" />
                <input class="slider" type="range" value="30" max="30" id="stock-slider-2" />
              </div>
            </div>
        </div>
        <div class="main__content">
            <div class="main__info">
                <div class="main__select">
                    <select class="main__select-sort">
                        <option data-id="title" disabled selected >Sort options:</option>
                        <option data-id="price-ASC">Sort by price (lowest to highest)</option>
                        <option data-id="price-DESC">Sort by price (highest to lowest)</option>
                        <option data-id="stock-ASC">Sort by stock (lowest to highest)</option>
                        <option data-id="stock-DESC">Sort by stock (highest to lowest)</option>
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


