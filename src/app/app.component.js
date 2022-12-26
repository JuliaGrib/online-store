//импортируем компонент из главного индекса во фреймворке
import { WFMComponent } from "../framework/index";

class AppComponent extends WFMComponent {
    constructor(config){
        super(config)
    }
}

//экспортируем в главный модуль app.module
export const appComponent = new AppComponent({
    //даем имя селектору тега (хз как вставляем тег на страницу)
    selector: 'app-root', //app-root - корневой компонент который будет содержать все остальные компоненты
    //сам шаблон
    template: `
        <app-header></app-header>
        <router-outlet></router-outlet>
    `
})