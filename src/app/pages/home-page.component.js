import { WFMComponent } from "../../framework/index";

class HomePageComponent extends WFMComponent {
    constructor(config){
        super(config)
    }
}

export const homePageComponent = new HomePageComponent({
    selector: 'app-home-page',
    template: '<img src="./assets/img.jpg" alt="image"><h1>Home Page</h1>'
})