import { homePageComponent } from './pages/home-page.component'
import { cartPageComponent } from './pages/cart-page.component'
import { aboutPageComponent } from './pages/about-page.component'
import { notFound } from './common/404.component'
import { productsList} from "./lists/products"

export const appRoutes = [
    { path: '', component: homePageComponent },
    { path: 'cart', component: cartPageComponent },
    { path: '**', component: notFound } //** - означают ключ что значение не найдено и грузим этот шаблон
]

productsList.products.forEach((elem) => {
  appRoutes.push({
    path: `about-product/${elem.id}`,
    component: aboutPageComponent,
  })
})