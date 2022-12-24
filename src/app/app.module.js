// модуль для всего приложения. Стартовый модуль. Здесь мы регистрируем все сущности
// модуль представляет из себя класс, который наследуется от базового класса модуля нашего фреймворка

//импортируем компонент из главного индекса во фреймворке
import { WFModule } from '../framework/index'

//импортируем корневой компонент из app.component
import { appComponent } from './app.component'

//импортируем компонент header
import { appHeader } from './common/app.header'

//импортируем массив роутев
import { appRoutes } from './app.routes'




//создаем класс модуля приложения на основе модуля во фреймворке
//работаем с компонентом который пришел из app.components
class AppModule extends WFModule {
    constructor(config){
        super(config)
    }
}

//экспортруется в корневой index.js
export const appModule = new AppModule({
    
    components: [
        appComponent, //корневой компонент, который содержит все компоненты <app-root>
        //походу сюда кладем компоненты html
        appHeader, //наш header
        
              
    ],
    bootstrap: appComponent,
    routes: appRoutes, //определяем новый объект в модуле,
    //appRoutes - массив роутев

})