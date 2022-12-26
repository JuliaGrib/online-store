import { wfm } from "../tools/util"

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

        this._initEvents()
    }

    //не у всех компонентов есть методы events, 
    //поэтому проверяем есть ли в компоненте метод events
    _initEvents(){
        if(wfm.isUdefined(this.events)) return

        //если метод событий есть, то получаем объект событий
        let events = this.events()

        Object.keys(events).forEach(key => {
            let listener = key.split(' ')
            this.el
            .querySelector(listener[1])
            .addEventListener([listener[0]], this[events[key]].bind(this))
        })
    }

}