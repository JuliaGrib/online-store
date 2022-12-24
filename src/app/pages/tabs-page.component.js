import { WFMComponent } from "../../framework/index";

class TabsPageComponent extends WFMComponent {
    constructor(config){
        super(config)
    }
}

export const tabsPageComponent = new TabsPageComponent({
    selector: 'app-tabs-page',
    template: '<h1>Tabs Page</h1>'
})