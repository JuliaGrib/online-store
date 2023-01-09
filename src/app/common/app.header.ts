import { WFMComponent } from '../../framework/index'
import { IConfigComponent } from '../../types/index'

class AppHeader extends WFMComponent {
    constructor(config: IConfigComponent){
        super(config)
    }
}

export const appHeader: AppHeader = new AppHeader(
    {
        selector: 'app-header',
        template: /*html*/`
        <header class="container__header">
          <div class="wrapper__main">
            <ul class="menu__header">
            <li class="item__header"><a href="#"><img src="../assets/logo.svg"></a></li>
            <li class="item__header"><span class="total-price__header">Total price:</span></li>
            <li class="item__header"><a class="cart__header" href="#cart"><img src="../assets/cart.svg"><div class="count__header">1</div></a></li>
          </ul>
          </div>
        </header>
        `
        
    }
)