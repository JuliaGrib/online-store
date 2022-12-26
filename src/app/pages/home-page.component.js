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
        let productsContainer = document.querySelector('.products');
        
        productsList.products.forEach((elem, index) => {
            
            let productElem = document.createElement('div');
            let productImg = document.createElement('img');
            let addButton = document.createElement('button');
            productElem.innerHTML = elem.title;
            productImg.src = elem.thumbnail;
            addButton.innerHTML = 'Add';
            productsContainer.appendChild(productElem);
            productElem.appendChild(productImg);
            productElem.appendChild(addButton);
            console.log(elem.title)
        })
    }

    //события
    events() {
        return {
            'click .pluse': 'onPluseClick',
        }
    }

    onPluseClick(event){
        console.log(event)
    }
}

export const homePageComponent = new HomePageComponent({
    selector: 'app-home-page',
    template: `<h1>Home Page</h1>
    <button class="pluse">+</button>
    <div class="products"></div>
    `
})