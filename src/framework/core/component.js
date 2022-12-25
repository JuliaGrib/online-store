export class Component {
    constructor(config){
        //шаблон
        this.template = config.template
        //селектор тега
        this.selector = config.selector
        this.el = null
    }

    render(){
        //создаем селектор
        this.el = document.querySelector(this.selector) 
        // if(!this.el) throw new Error(`Component with selector ${this.selector} wasnt found`)

        //в созданный селектор вставляем шаблон
        this.el.innerHTML = this.template
    }
}