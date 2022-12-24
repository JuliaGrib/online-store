

export class Module {
    constructor(config) {
        //компонент по примеру app.components
        this.components = config.components
        this.bootstrapComponent = config.bootstrap
    }

    //запускается в функции bootstrap
    //происходит инициализация компонента
    start() {
        this.initComponents()
    }


    //функция инициализации компонентов
    initComponents(){
        this.bootstrapComponent.render()
        //для каждого компонента вызываем метод рендер в DOM
        this.components.forEach(this.renderComponent.bind(this))
        
    }

    renderComponent(c){
        c.render() //функция из компонента фреймворка
    }
}