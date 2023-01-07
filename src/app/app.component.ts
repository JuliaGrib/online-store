//импортируем компонент из главного индекса во фреймворке
import { WFMComponent } from "../framework/index";
import { IConfigComponent } from "../types/index";

class AppComponent extends WFMComponent {
    
    constructor(config: IConfigComponent){
        super(config)
    }
}

export const appComponent: AppComponent = new AppComponent({
    selector: 'app-root',
    template: `
        <app-header></app-header>
        <router-outlet></router-outlet>
    `
})