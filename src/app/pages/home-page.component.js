import { WFMComponent } from "../../framework/index"
import { productsList } from "../lists/products"
import { extremum } from "./home-page.utils/extremum"

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
          'click .drop__item': 'removeProductToLocal',
          'input .input-main__search': 'searchProduct',
          'change .main__select-sort': 'sortProducts',
          'input .slider': 'multiSlider',
          'change .filter__main': 'filterProducts',
          'click .main__width': 'viewProducts',
          'click .reset-filters': 'resetFilters',
          'click .copy-link': 'copyLink',
      }
  }
    //вставляет товар из списка productsList на сайт
    makeProducts(){
        
        let productsContainer = document.querySelector('.products__main');
        productsContainer.innerHTML = '';

        let url = new URL(window.location)
        if(url.search) 
          this.updatePage();

        this.updateCount();

        this.visibleProducts.forEach((elem) => {
            
            let productElem = document.createElement('div');
            let productImg = document.createElement('img');
            let titleItem = document.createElement('a');
            let priceContainer = document.createElement('div');
            let priceItem = document.createElement('p');
            let addItemBtn = document.createElement('a');
            let dropItemBtn = document.createElement('a');
            let stockItem = document.createElement('div');

            productElem.classList.add('elem__item');
            priceContainer.classList.add('price__container');
            titleItem.classList.add('title__item');
            priceItem.classList.add('price__item');
            stockItem.classList.add('stock__item')
            addItemBtn.classList.add('add__item');
            dropItemBtn.classList.add('drop__item')
            dropItemBtn.classList.add('display-none')
            addItemBtn.classList.add('display-block')

            let range1 = document.querySelector('#range-1');
            let range2 = document.querySelector('#range-2');
            let stockRange1 = document.querySelector('#stock-range-1');
            let stockRange2 = document.querySelector('#stock-range-2');
            let slider1 = document.querySelector('#slider-1');
            let slider2 = document.querySelector('#slider-2');
            let stockSlider1 = document.querySelector('#stock-slider-1');
            let stockSlider2 = document.querySelector('#stock-slider-2');

            slider1.min = 340
            slider1.max = 2570
            slider2.min = 340
            slider2.max = 2570
            stockSlider1.min = 5
            stockSlider1.max = 30
            stockSlider2.min = 5
            stockSlider2.max = 30

            let params = new URLSearchParams(document.location.search);

            if(!params.get('price') && !params.get('stock')) {
              slider1.value = extremum.minPrice();
              slider2.value = extremum.maxPrice();
              stockSlider1.value = extremum.minStock();
              stockSlider2.value = extremum.maxStock();
            }

            if(params.get('price') && !params.get('stock')) {
              stockSlider1.value = extremum.minStock();
              stockSlider2.value = extremum.maxStock();
            }

            if(!params.get('price') && params.get('stock')) {
              slider1.value = extremum.minPrice();
              slider2.value = extremum.maxPrice();
            }

            range1.innerHTML = slider1.value
            range2.innerHTML = slider2.value
            stockRange1.innerHTML = stockSlider1.value
            stockRange2.innerHTML = stockSlider2.value

            productImg.src = elem.thumbnail;
            titleItem.href = `#about-product/${elem.id}`;
            titleItem.innerHTML = elem.title;
            priceItem.innerHTML = `$${elem.price}`;
            addItemBtn.setAttribute('data-id', `${elem.id}`);
            dropItemBtn.setAttribute('data-id', `${elem.id}`);
            addItemBtn.innerHTML = 'Add to cart';
            dropItemBtn.innerHTML = 'Drop from cart';
            stockItem.innerHTML = `Stock: ${elem.stock}`;

           

            productsContainer.appendChild(productElem);
            productElem.appendChild(productImg);
            productElem.appendChild(titleItem);
            productElem.appendChild(priceContainer);
            priceContainer.appendChild(priceItem);
            priceContainer.appendChild(stockItem)
            priceContainer.appendChild(addItemBtn);
            priceContainer.appendChild(dropItemBtn);
            
            let localArr = JSON.parse(localStorage.productsLocal)

            if(localArr.products.find(item => item.id == elem.id)) {
              addItemBtn.classList.remove('display-block')
              addItemBtn.classList.add('display-none')
              dropItemBtn.classList.remove('display-none')
              dropItemBtn.classList.add('display-block')
            } 

        })

        if(this.visibleProducts.length === 0) {
          productsContainer.innerHTML = 'No products found';
        }

        const total = document.querySelector('.main__total')
        total.innerHTML = `Found: ${this.visibleProducts.length}` 
    }

    updateCount() {
      const checkboxes = document.querySelectorAll('input[type=checkbox]')
      checkboxes.forEach((item) => {
        let count = 0
        this.visibleProducts.forEach((elem) => {
          if(elem.brand === item.nextElementSibling.dataset.id || 
             elem.category === item.nextElementSibling.dataset.id) {
            count++
          }
        })
        item.nextElementSibling.innerHTML = `(${count})`
        if(count === 0) {
          item.nextElementSibling.style.color ="gray";
        } else {
          item.nextElementSibling.style.color ="black";
        }
      })
      }

    updatePage() {
      this.visibleProducts = productsList.products;

      let params = new URLSearchParams(document.location.search);

      let search = params.get("search");
      let sort = params.get("sort");
      let price = params.get("price");
      let stock = params.get("stock");
      let category = params.get("category");
      let brand = params.get("brand")
      let view = params.get("view")

      if(search == '') this.clearQuery("search")
      if(category == '') this.clearQuery("category")
      if(brand == '') this.clearQuery("brand")
      if(view == '') this.clearQuery("view")

      if(category) this.filterReload(category)
      if(brand) this.filterReload(brand)
      if(view) this.viewReload(view)
      if(stock) this.updateStockRange(stock)
      if(price) this.updatePriceRange(price)
      if(search) this.updateSearch(search)
      if(sort) this.updateSort(sort);
    }

    updateSort(sort) {
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

    updateSearch(search) {
      
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

    updateStockRange(range) {
      const stockSlider1 = document.querySelector('#stock-slider-1');
      const stockSlider2 = document.querySelector('#stock-slider-2');
      const stockRange1 = document.querySelector('#stock-range-1');
      const stockRange2 = document.querySelector('#stock-range-2');

      let min = +range.split('↕')[0]
      let max = +range.split('↕')[1]
      stockSlider1.min = extremum.minStock();
      stockSlider1.max = extremum.maxStock();
      stockSlider2.min = extremum.minStock();
      stockSlider2.max = extremum.maxStock();

      stockSlider1.value = min;
      stockSlider2.value = max;
      stockRange1.value = min;
      stockRange2.value = max;

      let tempArray = this.visibleProducts.filter(
        elem => elem.stock >= min && elem.stock <= max ||
        elem.price >= min && elem.price <= max)
      this.visibleProducts = tempArray;
    }

    updatePriceRange(range) {
      const slider1 = document.querySelector('#slider-1');
      const slider2 = document.querySelector('#slider-2');
      const range1 = document.querySelector('#range-1');
      const range2 = document.querySelector('#range-2');

      let min = +range.split('↕')[0]
      let max = +range.split('↕')[1]

      slider1.min = extremum.minPrice();
      slider1.max = extremum.maxPrice();
      slider2.min = extremum.minPrice();
      slider2.max = extremum.maxPrice();

      slider1.value = min;
      slider2.value = max;
      range1.value = min;
      range2.value = max;

      let tempArray = this.visibleProducts.filter(
        elem => elem.stock >= min && elem.stock <= max ||
        elem.price >= min && elem.price <= max)
      this.visibleProducts = tempArray;
    }

    viewReload(view) {
      if(view) {
        const container = document.querySelector('.products__main')
        if(view == 'block') {
          container.style.display = "grid"
        }
        if(view == 'list') {
          container.style.display = "block"
        }
      }
    }

    viewProducts(event) {
      let key = event.target.dataset.id;
      this.makeQuery('view', key)
      this.makeProducts();
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

    copyLink() {
      const copyField = document.querySelector('.copy-field')
      const copyLink = document.querySelector('.copy-link')
      copyLink.innerHTML = "Copied!"
      copyLink.style.color = "orange"
      setTimeout(() => {
        copyLink.innerHTML = "Copy link"
        copyLink.style.color = "black"
      },500)
      copyField.value =  window.location.href;
      copyField.setAttribute('readonly', '');
      copyField.select();
      copyField.setSelectionRange(0, 99999);
      document.execCommand('copy');
    }

    resetFilters() {
      const checkboxes = document.querySelectorAll('input[type=checkbox]')
      const input = document.querySelector('.input-main__search')
      const slider1 = document.querySelector('#slider-1');
      const slider2 = document.querySelector('#slider-2');
      const stockSlider1 = document.querySelector('#stock-slider-1');
      const stockSlider2 = document.querySelector('#stock-slider-2');

      let url = new URL(window.location)
      url.searchParams.delete('category')
      url.searchParams.delete('brand')
      url.searchParams.delete('price')
      url.searchParams.delete('stock')
      url.searchParams.delete('search')
      url.searchParams.delete('sort')
      history.pushState(null, null, url);

      checkboxes.forEach(elem => elem.checked = false)
      input.value = ''
      slider1.value = "366"
      slider2.value = "2565"
      stockSlider1.value = "5"
      stockSlider2.value = "30"
      this.visibleProducts = productsList.products;
      this.makeProducts();  
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

    multiSlider(event) {
      const minGapPrice = 160;
      const minGapStock = 1;
      const slider1 = document.querySelector('#slider-1')
      const slider2 = document.querySelector('#slider-2')
      const stockSlider1 = document.querySelector('#stock-slider-1')
      const stockSlider2 = document.querySelector('#stock-slider-2')

      if(event.target.id === "slider-1") {
        if(parseInt(slider2.value) - parseInt(slider1.value) <= minGapPrice) {
          slider1.value = parseInt(slider2.value) - minGapPrice;
        }
        this.makeQuery('price', `${slider1.value}↕${slider2.value}`)
      }
      if(event.target.id === "slider-2") {
        if(parseInt(slider2.value) - parseInt(slider1.value) <= minGapPrice) {
          slider2.value = parseInt(slider1.value) + minGapPrice;
        }
        this.makeQuery('price', `${slider1.value}↕${slider2.value}`)
      }
      if(event.target.id === "stock-slider-1") {
        if(parseInt(stockSlider2.value) - parseInt(stockSlider1.value) <= minGapStock) {
          stockSlider1.value = parseInt(stockSlider2.value) - minGapStock;
        }
        this.makeQuery('stock', `${stockSlider1.value}↕${stockSlider2.value}`)
      }
      if(event.target.id === "stock-slider-2") {
        if(parseInt(stockSlider2.value) - parseInt(stockSlider1.value) <= minGapStock) {
          stockSlider2.value = parseInt(stockSlider1.value) + minGapStock;
        }
        this.makeQuery('stock', `${stockSlider1.value}↕${stockSlider2.value}`)
      }
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
      const add = document.querySelector(`.add__item[data-id="${event.target.dataset.id}"`)
      const drop = document.querySelector(`.drop__item[data-id="${event.target.dataset.id}"`)
      console.log(drop)
      let currentId = event.target.dataset.id;
      let currentItem = productsList.products.find(elem => elem.id == currentId);
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
      }, 500)
    }

    removeProductToLocal(event){
      const add = document.querySelector(`.add__item[data-id="${event.target.dataset.id}"`)
      const drop = document.querySelector(`.drop__item[data-id="${event.target.dataset.id}"`)
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
}


export const homePageComponent = new HomePageComponent({
    selector: 'app-home-page',
    template: /*html*/`
    <div class="banner__main"></div>
    <div class="container__main">
        <div class="sidebar__main">
            <button class="reset-filters">Reset filters</button>
            <button class="copy-link">Copy link</button>
            <input type="text" class="copy-field"/>
            <div class="filter__main">
                <p class="filter__title">Categories</p>
                <ul class="checkbox-category__main">
                    <li>
                      <input class="category"  type="checkbox" name="sofa" value="sofa">
                      Sofa
                      <div class="count__category" data-id="Sofa">(5)</div>
                    </li>
                    <li>
                      <input class="category" type="checkbox" name="armchair" value="armchair">
                      Armchair
                      <div class="count__category" data-id="Armchair">(5)</div>
                    </li>
                    <li>
                      <input class="category" type="checkbox" name="table" value="table">
                      Table
                      <div class="count__category" data-id="Table">(5)</div>
                    </li>
                    <li>
                      <input class="category" type="checkbox" name="chair" value="chair">
                      Сhair
                      <div class="count__category" data-id="Chair">(5)</div>
                    </li>
                </ul>
            </div>
            <div class="filter__main">
                <p class="filter__title">Brand</p>
                <ul>
                    <li>
                      <input class="brand" type="checkbox" name="viena" value="viena">
                      Viena
                      <div class="count__brand" data-id="Viena">(5)</div>
                      </li>
                    <li>
                      <input class="brand" type="checkbox" name="numo" value="numo">
                      Numo
                      <div class="count__brand" data-id="Numo">(5)</div>
                    </li>
                    <li>
                      <input class="brand" type="checkbox" name="dins" value="dins">
                      Dins
                      <div class="count__brand" data-id="Dins">(5)</div>
                    </li>
                    <li>
                      <input class="brand" type="checkbox" name="abby" value="abby">
                      Abby
                      <div class="count__brand" data-id="Abby">(5)</div>
                      </li>
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
                <input class="slider" type="range" id="slider-1" />
                <input class="slider" type="range" id="slider-2" />
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
                <input class="slider" type="range"  id="stock-slider-1" />
                <input class="slider" type="range"  id="stock-slider-2" />
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
                <div class="main__total"></div>
                <div class="main__search">
                    <input class="input-main__search" type="search" placeholder="Search"></input>
                </div>
                <div class="main__width">
                  View:
                  <button data-id="block" class="block__view">block</button>
                  <button data-id="list" class="list__view">list</button>
                </div>
            </div>
            <div class="products__main"></div>
        </div>
    </div>
    `
})


