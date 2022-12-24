//импортируем шаблоны страниц
import { homePageComponent } from './pages/home-page.component'
import { tabsPageComponent } from './pages/tabs-page.component'

//экспортируем массив роутев
export const appRoutes = [
    { path: '', component: homePageComponent },
    { path: 'tabs', component: tabsPageComponent }
]

