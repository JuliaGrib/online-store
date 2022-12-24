import { WFMComponent } from "../../framework/index";

class HomePageComponent extends WFMComponent {
    constructor(config){
        super(config)
    }
}

export const homePageComponent = new HomePageComponent({
    selector: 'app-home-page',
    template: '<h1>Home Page</h1>'
})