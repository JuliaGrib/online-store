import { router } from "../tools/router";
import { wfm } from "../tools/util";
import { IConfigModule } from "../../types/index";
import { Component } from "./component"
import { IRoutes } from "../../types/index";
 
export class Module {
    components: Array<Component>
    bootstrapComponent: Component
    routes: Array<IRoutes>
    constructor(config: IConfigModule) {
        //компонент по примеру app.components
        this.components = config.components
        this.bootstrapComponent = config.bootstrap
        this.routes = config.routes
    }
    
    start() {
        this.initComponents()
        if(this.routes) this.initRoutes()
    }

    initComponents(){
        this.bootstrapComponent.render()
        this.components.forEach(this.renderComponent.bind(this))
        
    }

    initRoutes() {
        window.addEventListener('hashchange', this.renderRoute.bind(this))
        this.renderRoute()//страница остается даже после перезагрузки
    }

    renderRoute() {
        const url: string = router.getUrl()
        // eslint-disable-next-line
        let route: IRoutes | undefined = this.routes!.find(r => r.path === url) 
        if(wfm.isUdefined(route)){
            route = this.routes.find(r => r.path === '**') 
        }
        const routeDiv = (document.querySelector('router-outlet')) as HTMLElement
        routeDiv.innerHTML = `<${route.component.selector}></${route.component.selector}>`
        this.renderComponent(route.component)
    }

    renderComponent(c: Component){
        c.render() //функция из компонента фреймворка
    }
}