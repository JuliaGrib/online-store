import { WFMComponent } from '../../framework/index'

class NotFound extends WFMComponent {
    constructor(config) {
        super(config)
    }
}

export const notFound = new NotFound({
    selector: 'app-not-found',
    template: `
        <div>
            <h2>Страница не найдена</h2>
            <a href="#">Вернуться на главную</a>
        </div>

    `
})