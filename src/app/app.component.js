//импортируем компонент из главного индекса во фреймворке
import { WFMComponent } from "../framework/index";

class AppComponent extends WFMComponent {
    constructor(config){
        super(config)

        // вот что экспортировали

        //шаблон
        // this.template = config.template
        // //селектор тега
        // this.selector = config.selector
        // this.el = null

        // render(){
        //     this.el = document.querySelector(this.selector)
        //     if(!this.el) throw new Error(`Component with selector ${this.selector} wasnt found`)
    
        //     //в созданный селектор вставляем шаблон
        //     this.el.innerHTML = this.template
        // }
    }
}

//экспортируем в главный модуль app.module
export const appComponent = new AppComponent({
    //даем имя селектору тега (хз как вставляем тег на страницу)
    selector: 'app-root', //app-root - корневой компонент который будет содержать все остальные компоненты
    //сам шаблон
    template: `
        <app-header>hi</app-header>
        <router-outlet></router-outlet>
    `
})