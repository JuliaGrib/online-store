import { WFMComponent } from "../../framework/index";

class HomePageComponent extends WFMComponent {
    constructor(config){
        super(config)
    }

    events() {
        return {
            'click .pluse': 'onPluseClick',
        }
    }

    onPluseClick(event){
        let num = document.querySelector('.num').innerHTML;
        document.querySelector('.num').innerHTML = ++num;
        

    }
}

export const homePageComponent = new HomePageComponent({
    selector: 'app-home-page',
    template: '<h1>Home Page</h1>'
})