//из tools получаем функцию для роутера
import { router } from "../tools/router";
import { wfm } from "../tools/util";

export class Module {
    constructor(config) {
        //компонент по примеру app.components
        this.components = config.components
        this.bootstrapComponent = config.bootstrap
        this.routes = config.routes
    }
    
    //запускается в функции bootstrap
    //происходит инициализация компонента
    start() {
        this.initComponents()
        //если есть массив роутов, вызываем метод
        if(this.routes) this.initRoutes()
    }


    //функция инициализации компонентов
    initComponents(){
        this.bootstrapComponent.render()
        //для каждого компонента вызываем метод рендер в DOM
        this.components.forEach(this.renderComponent.bind(this))
        
    }

    initRoutes() {
        window.addEventListener('hashchange', this.renderRoute.bind(this))
        this.renderRoute()//страница остается даже после перезагрузки
    }

    renderRoute() {
        let url = router.getUrl() //фукция из tools/route.js
        let route = this.routes.find(r => r.path === url) 

        //если роут не найден то 404
        if(wfm.isUdefined(route)){
            route = this.routes.find(r => r.path === '**') 
        }

        document.querySelector('router-outlet').innerHTML = `<${route.component.selector}></${route.component.selector}>`
        this.renderComponent(route.component)
    }

    renderComponent(c){
        c.render() //функция из компонента фреймворка
    }
}