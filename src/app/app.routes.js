//импортируем шаблоны страниц
import { homePageComponent } from './pages/home-page.component'
import { tabsPageComponent } from './pages/tabs-page.component'
import { notFound } from './common/404.component'

//экспортируем массив роутев
export const appRoutes = [
    { path: '', component: homePageComponent },
    { path: 'tabs', component: tabsPageComponent },
    { path: '**', component: notFound } //** - означают ключ что значение не найдено и грузим этот шаблон
]

