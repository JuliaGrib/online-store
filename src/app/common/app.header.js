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
        <header class="container__header">
          <ul class="menu__header">
            <li class="item__header"><a href="#">Главная</a></li>
            <li class="item__header"><a href="#tabs">Таб</a></li>
            <li class="item__header"><a href="#cart">Cart</a></li>
            <li class="item__header"><a href="#dwdeaweda">404</a></li>
            <li class="item__header"><a href="?rgfg=dfoh">404_with_query</a></li>

          </ul>
        </header>
        `
        
    }
)