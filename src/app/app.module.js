// модуль для всего приложения. Стартовый модуль. Здесь мы регистрируем все сущности
// модуль представляет из себя класс, который наследуется от базового класса модуля нашего фреймворка

//импортируем компонент из главного индекса во фреймворке
import { WFModule } from '../framework/index'

//импортируем компонент из app.component
import { appComponent } from './app.component'



//создаем класс модуля приложения на основе модуля во фреймворке
//работаем с компонентом который пришел из app.components
class AppModule extends WFModule {
    constructor(config){
        super(config)
        // вот что наследуется из модуля фремйворка
        // this.components = config.components
        // this.bootstrapComponent = config.bootstrap
        // this.routes = config.routes
    }
}

//экспортруется в корневой index.js
export const appModule = new AppModule({
    
    components: [
        //походу сюда кладем компоненты html
              
    ],
    bootstrap: appComponent,
})