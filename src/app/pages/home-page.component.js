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
            'makeJsonProducts' : 'makeJsonProducts',
        }
    }

    //пробуем выкатить json
    makeJsonProducts(){

    }

    

    //вставляет товар из списка productsList на сайт
    makeProducts(){
        let productsContainer = document.querySelector('.products');
        
        productsList.products.forEach((elem, index) => {
            
            let productElem = document.createElement('div');
            let productImg = document.createElement('img');
            let addItemBtn = document.createElement('button');
            let removeItemBtn = document.createElement('button');
            addItemBtn.setAttribute('data-id', `${elem.id}`);
            removeItemBtn.setAttribute('data-id', `${elem.id}`);
            addItemBtn.classList.add('add__item');
            removeItemBtn.classList.add('remove__item');
            productElem.innerHTML = elem.title;
            productImg.src = elem.thumbnail;
            addItemBtn.innerHTML = 'Add';
            removeItemBtn.innerHTML = 'Del';
            productsContainer.appendChild(productElem);
            productElem.appendChild(productImg);
            productElem.appendChild(addItemBtn);
            productElem.appendChild(removeItemBtn);

            
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
    template: `<h1>Home Page</h1>
    <button class="pluse">+</button>
    <div class="products"></div>
    `
})


