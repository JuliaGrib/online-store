import { WFMComponent } from '../../framework/index'

class AppHeader extends WFMComponent {
    constructor(config){
        super(config)
    }
}

export const appHeader = new AppHeader(
    {
        selector: 'app-header',
        template: `
        <header>
        <ul>
        <li><a href="#">Главная</a></li>
        <li><a href="#tabs">Таб</a></li>
        </ul>
        </header>
        `
        
    }
)