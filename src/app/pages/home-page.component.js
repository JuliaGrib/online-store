import { WFMComponent } from "../../framework/index"
import { productsList} from "../lists/products"

class HomePageComponent extends WFMComponent {
    constructor(config){
        super(config)
    }

    //действия сразу при запуске
    actions() {
        return {
            'makeProducts': 'makeProducts',
        }
    }

    //вставляет товар из списка productsList на сайт
    makeProducts(){
        let productsContainer = document.querySelector('.products__main');
        
        productsList.products.forEach((elem, index) => {
            
            let productElem = document.createElement('div');
            let productImg = document.createElement('img');
            let titleItem = document.createElement('p');
            let priceContainer = document.createElement('div');
            let priceItem = document.createElement('p');
            let addItemBtn = document.createElement('a');

            productElem.classList.add('elem__item');
            priceContainer.classList.add('price__container');
            titleItem.classList.add('title__item');
            priceItem.classList.add('price__item')
            addItemBtn.classList.add('add__item');

            productImg.src = elem.thumbnail;
            titleItem.innerHTML = elem.title;
            priceItem.innerHTML = `$${elem.price}`;
            addItemBtn.setAttribute('data-id', `${elem.id}`);
            addItemBtn.innerHTML = 'Add to cart';

            productsContainer.appendChild(productElem);
            productElem.appendChild(productImg);
            productElem.appendChild(titleItem);
            productElem.appendChild(priceContainer);
            priceContainer.appendChild(priceItem);
            priceContainer.appendChild(addItemBtn);

            
        })
    }

    //события
    events() {
        return {
            'click .add__item': 'addProductToLocal',
            'click .remove__item': 'removeProductToLocal',
        }
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
    template: `
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
                    <select>
                        <option>Descending</option>
                        <option>Ascending</option>
                    </select>
                </div>
                <div class="main__search">
                    <input type="search" placeholder="Search"></input>
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


