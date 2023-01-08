import { WFMComponent } from "../../framework/index"
import { productsList } from "../lists/products"
import { extremum } from "./home-page.utils/extremum"
import { filterBy } from "./home-page.utils/filters"
import { updatePage } from "./home-page.utils/utils"
import { headerCounter } from "../common/header.utils/counter"
import { IConfigComponent, IProduct } from "../../types/index"

class HomePageComponent extends WFMComponent {
  constructor(config: IConfigComponent){
    super(config)
  }

  visibleProducts: IProduct[] = productsList.products;

  actions() {
      return {
        'makeProducts': 'makeProducts',
      }
    }

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

  makeProducts(){
      headerCounter();
      const productsContainer = (document.querySelector('.products__main')) as HTMLElement
      productsContainer.innerHTML = '';
      const url = new URL(window.location.href)
      if(url.search) 
        updatePage();
      this.updateCount();
      this.visibleProducts.forEach((elem) => {   
        const productElem = document.createElement('div');
        const linkItem = document.createElement('a');
        const productImg = document.createElement('img');
        const titleItem = document.createElement('p');
        const priceContainer = document.createElement('div');
        const priceItem = document.createElement('p');
        const addItemBtn = document.createElement('a');
        const dropItemBtn = document.createElement('a');
        const stockItem = document.createElement('div');
        productElem.classList.add('elem__item');
        linkItem.classList.add('link__item');
        priceContainer.classList.add('price__container');
        titleItem.classList.add('title__item');
        priceItem.classList.add('price__item');
        stockItem.classList.add('stock__item')
        addItemBtn.classList.add('add__item');
        dropItemBtn.classList.add('drop__item')
        dropItemBtn.classList.add('display-none')
        addItemBtn.classList.add('display-block')
        const range1 = (document.querySelector('#range-1')) as HTMLInputElement
        const range2 = (document.querySelector('#range-2')) as HTMLInputElement
        const stockRange1 = (document.querySelector('#stock-range-1')) as HTMLInputElement
        const stockRange2 = (document.querySelector('#stock-range-2')) as HTMLInputElement
        const slider1 = (document.querySelector('#slider-1')) as HTMLInputElement
        const slider2 = (document.querySelector('#slider-2')) as HTMLInputElement
        const stockSlider1 = (document.querySelector('#stock-slider-1')) as HTMLInputElement
        const stockSlider2 = (document.querySelector('#stock-slider-2')) as HTMLInputElement
        slider1.min = '340'
        slider1.max = '2570'
        slider2.min = '340'
        slider2.max = '2570'
        stockSlider1.min = '5'
        stockSlider1.max = '30'
        stockSlider2.min = '5'
        stockSlider2.max = '30'
        const params: URLSearchParams = new URLSearchParams(document.location.search);
        if(!params.get('price') && !params.get('stock')) {
          slider1.value = `${extremum.minPrice()}`
          slider2.value = `${extremum.maxPrice()}`
          stockSlider1.value = `${extremum.minStock()}`
          stockSlider2.value = `${extremum.maxStock()}`
        }
        if(params.get('price') && !params.get('stock')) {
          stockSlider1.value = `${extremum.minStock()}`
          stockSlider2.value = `${extremum.maxStock()}`
        }
        if(!params.get('price') && params.get('stock')) {
          slider1.value = `${extremum.minPrice()}`
          slider2.value = `${extremum.maxPrice()}`
        }
        range1.innerHTML = slider1.value
        range2.innerHTML = slider2.value
        stockRange1.innerHTML = stockSlider1.value
        stockRange2.innerHTML = stockSlider2.value
        productImg.src = elem.thumbnail;
        linkItem.href = `#about-product/${elem.id}`;
        titleItem.innerHTML = elem.title;
        priceItem.innerHTML = `$${elem.price}`;
        addItemBtn.setAttribute('data-id', `${elem.id}`);
        dropItemBtn.setAttribute('data-id', `${elem.id}`);
        addItemBtn.innerHTML = 'Add to cart';
        dropItemBtn.innerHTML = 'Drop from cart';
        stockItem.innerHTML = `Stock: ${elem.stock}`;
        productsContainer.appendChild(productElem);
        productElem.appendChild(linkItem);
        productElem.appendChild(productImg);
        productElem.appendChild(titleItem);
        productElem.appendChild(stockItem);
        productElem.appendChild(priceContainer);
        priceContainer.appendChild(priceItem);
        priceContainer.appendChild(addItemBtn);
        priceContainer.appendChild(dropItemBtn);
        const localArr = JSON.parse(localStorage.productsLocal)

        addItemBtn.addEventListener('click', this.addProductToLocal)
        dropItemBtn.addEventListener('click', this.removeProductToLocal)

        if(localArr.products.find((item: { id: number }) => item.id == elem.id)) {
          addItemBtn.classList.remove('display-block')
          addItemBtn.classList.add('display-none')
          dropItemBtn.classList.remove('display-none')
          dropItemBtn.classList.add('display-block')
        } 
      })
      if(this.visibleProducts.length === 0) {
        productsContainer.innerHTML = 'No products found';
      }
      const total = (document.querySelector('.main__total')) as HTMLHtmlElement
      total.innerHTML = `Found: ${this.visibleProducts.length}` 
  }

  updateCount() {
    const checkboxes = (document.querySelectorAll('input[type=checkbox]')) as NodeListOf<HTMLInputElement>
    checkboxes.forEach((item) => {
      let countVisible = 0;
      let countProducts = 0
      this.visibleProducts.forEach((elem) => {
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        const nextSubling: HTMLElement = <HTMLElement>item.nextElementSibling!
        if(elem.brand === nextSubling.dataset.id || 
        elem.category === nextSubling.dataset.id) {
          countVisible++
        }
      })
      productsList.products.forEach((elem) => {
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        const nextSubling: HTMLElement = <HTMLElement>item.nextElementSibling!
        if(elem.brand === nextSubling.dataset.id || 
        elem.category === nextSubling.dataset.id) {
          countProducts++
        }
      })
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      item.nextElementSibling!.innerHTML = `(${countVisible}/${countProducts})`
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      const nextSubling: HTMLElement = <HTMLElement>item.nextElementSibling!
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      const parenNode: HTMLElement = <HTMLElement>item.parentNode!
      if(countVisible === 0) {
        parenNode.style.color ="gray";
        nextSubling.style.color ="gray";
      } else {
        parenNode.style.color ="black";
        nextSubling.style.color ="black";
      }
    })
  }

  viewProducts(event: { target: { dataset: { id: string } } }) {
    const key = event.target.dataset.id;
    this.makeQuery('view', key)
    this.makeProducts();
  }
  // eslint-disable-next-line 
  filterProducts(event: any) {
    const target = event.target;
    if(!target) throw new Error('is not defined')
    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
      if(target.classList  == 'category') 
        filterBy('category', event)
      if(target.classList  == 'brand') 
        filterBy('brand', event)
    }
  }

  copyLink() {
    const copyField = (document.querySelector('.copy-field')) as HTMLInputElement
    const copyLink = (document.querySelector('.copy-link')) as HTMLButtonElement
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
    const checkboxes = (document.querySelectorAll('input[type=checkbox]')) as NodeListOf<HTMLInputElement>
    const input = (document.querySelector('.input-main__search')) as HTMLInputElement
    const slider1 = (document.querySelector('#slider-1')) as HTMLInputElement
    const slider2 = (document.querySelector('#slider-2')) as HTMLInputElement
    const stockSlider1 = (document.querySelector('#stock-slider-1')) as HTMLInputElement
    const stockSlider2 = (document.querySelector('#stock-slider-2')) as HTMLInputElement

    const url: URL = new URL(window.location.href)
    url.searchParams.delete('category')
    url.searchParams.delete('brand')
    url.searchParams.delete('price')
    url.searchParams.delete('stock')
    url.searchParams.delete('search')
    url.searchParams.delete('sort')
    history.pushState(null, '', url);

    checkboxes.forEach(elem => elem.checked = false)
    input.value = ''
    slider1.value = "366"
    slider2.value = "2565"
    stockSlider1.value = "5"
    stockSlider2.value = "30"
    this.visibleProducts = productsList.products;
    this.makeProducts();  
  }

  makeQuery(key: string, value: string) {
    const url: URL = new URL(window.location.href)
    url.searchParams.set(key, value)
    history.pushState(null, '', url);
  }

  clearQuery(key: string) {
    const url = new URL(window.location.href)
    url.searchParams.delete(key)
    history.pushState(null, '', url);
    if(!url.search) {
      this.visibleProducts = productsList.products;
    }
  }

  multiSlider(event: { target: { id: string } }) {
    const minGapPrice = 160;
    const minGapStock = 1;
    const slider1 = (document.querySelector('#slider-1')) as HTMLInputElement
    const slider2 = (document.querySelector('#slider-2')) as HTMLInputElement
    const stockSlider1 = (document.querySelector('#stock-slider-1')) as HTMLInputElement
    const stockSlider2 = (document.querySelector('#stock-slider-2'))as HTMLInputElement

    if(event.target.id === "slider-1") {
      if(parseInt(slider2.value) - parseInt(slider1.value) <= minGapPrice) {
        slider1.value = `${parseInt(slider2.value) - minGapPrice}`
      }
      this.makeQuery('price', `${slider1.value}↕${slider2.value}`)
    }
    if(event.target.id === "slider-2") {
      if(parseInt(slider2.value) - parseInt(slider1.value) <= minGapPrice) {
        slider2.value = `${parseInt(slider1.value) + minGapPrice}`
      }
      this.makeQuery('price', `${slider1.value}↕${slider2.value}`)
    }
    if(event.target.id === "stock-slider-1") {
      if(parseInt(stockSlider2.value) - parseInt(stockSlider1.value) <= minGapStock) {
        stockSlider1.value = `${parseInt(stockSlider2.value) - minGapStock}`
      }
      this.makeQuery('stock', `${stockSlider1.value}↕${stockSlider2.value}`)
    }
    if(event.target.id === "stock-slider-2") {
      if(parseInt(stockSlider2.value) - parseInt(stockSlider1.value) <= minGapStock) {
        stockSlider2.value = `${parseInt(stockSlider1.value) + minGapStock}`
      }
      this.makeQuery('stock', `${stockSlider1.value}↕${stockSlider2.value}`)
    }
    this.makeProducts();
  }

    sortProducts(event: { target: { value: string } }) {
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

    searchProduct(event: { target: { value: string } }) {
      const value = event.target.value.toLowerCase();
      this.makeQuery("search", value)
      this.makeProducts();
    }
    // eslint-disable-next-line
    addProductToLocal(event: MouseEvent){
      const target: HTMLElement = <HTMLElement>event.target
      const add = (document.querySelector(`.add__item[data-id="${target.dataset.id}"`)) as HTMLButtonElement
      const drop = (document.querySelector(`.drop__item[data-id="${target.dataset.id}"`)) as HTMLButtonElement
      const currentId = +target.dataset.id;
      const currentItem = productsList.products.find(elem => elem.id == currentId);
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
      }, 500)
    }

    removeProductToLocal(event: MouseEvent){
      const target: HTMLElement = <HTMLElement>event.target
      const add = (document.querySelector(`.add__item[data-id="${target.dataset.id}"`)) as HTMLButtonElement
      const drop = (document.querySelector(`.drop__item[data-id="${target.dataset.id}"`)) as HTMLButtonElement
      const localArr = JSON.parse(localStorage.productsLocal)
      const currentId = +target.dataset.id
      const currentItem = localArr.products.find((elem: { id: number }) => elem.id == currentId);
      const indexItem = localArr.products.indexOf(currentItem)
      let count = 0
      for(const elem of localArr.products) {
        if(elem.id == currentId) {
          count++
        }
      }
      localArr.products.splice(indexItem, count);
      localStorage.productsLocal = JSON.stringify(localArr);
      drop.style.color = "red"
      headerCounter();
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
    
    <div class="banner__main">
      <div class="wrapper__content">
        <div class="wrapper__text">New collection in 2023</div>
        <div class="wrapper__img"><img src="../assets/main/sofa-banner.png"></div>
      </div>
      <div class="design__line">
        <div class="wrapper__main">
            <div class="design__text">New Arrivals</div>
        </div>
      </div>
    </div>

      <div class="wrapper__main">
      <div class="vertical__line"></div>   
        <div class="container__main">

            <div class="sidebar__main">
              <div class="sidebar__title">Filter by</div>
                <a class="reset-filters">Reset filters</a>
                <a class="copy-link">Copy link</a>
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
                  <h3 class="filter__title">Price</h3>
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
                  <h3 class="filter__title">Stock</h3>
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
                      <span>View:</span>
                      <a class="block__view"><img data-id="block" src="../assets/main/block.svg"></a>
                      <a class="list__view"><img data-id="list" src="../assets/main/list.svg"></a>
                    </div>
                </div>
                <div class="products__main"></div>
            </div>
        </div>
      </div>
    `
})


