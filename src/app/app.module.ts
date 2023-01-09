import { WFModule } from '../framework/index'
import { appComponent } from './app.component'
import { appHeader } from './common/app.header'
import { appRoutes } from './app.routes'
import { IConfigModule} from '../types/index'


class AppModule extends WFModule {
    constructor(config: IConfigModule){
        super(config)
    }
}

export const appModule: AppModule = new AppModule({
    components: [
        appComponent,
        appHeader,

    ],
    bootstrap: appComponent,
    routes: appRoutes, 
})