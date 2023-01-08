import { WFMComponent } from '../../framework/index'
import { IConfigComponent } from '../../types/index'

class NotFound extends WFMComponent {
    constructor(config: IConfigComponent) {
        super(config)
    }
}

export const notFound: NotFound = new NotFound({
    selector: 'app-not-found',
    template: `
    <div class="container__404">
      <div class="page__404">
        <h1 class="title__404">404</h1>
        <p class="text__404">Похоже что такой страницы нет</p>
        <a class="main-link__404" href="/">⟵ Вернуться на главную</a>
      </div>
    </div>
    `
})