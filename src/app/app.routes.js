//импортируем шаблоны страниц
import { homePageComponent } from './pages/home-page.component'
import { tabsPageComponent } from './pages/tabs-page.component'
import { cartPageComponent } from './pages/cart-page.component'
import { aboutPageComponent } from './pages/about-page.component'
import { notFound } from './common/404.component'
import { productsList} from "./lists/products"

//экспортируем массив роутев
export const appRoutes = [
    { path: '', component: homePageComponent },
    { path: 'tabs', component: tabsPageComponent },
    { path: 'cart', component: cartPageComponent },
    { path: '**', component: notFound } //** - означают ключ что значение не найдено и грузим этот шаблон
]

productsList.products.forEach((elem) => {
  appRoutes.push({
    path: `about-product/${elem.id}`,
    component: aboutPageComponent,
  })
})