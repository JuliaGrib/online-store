//импортируем нормалайз
import "./app/styles/normalize.css"

//импортируем стиль 404 страницы
import "./app/styles/404.css"

//импортируем стиль хедера
import "./app/styles/header.css"

//импорт функции запуска модуля
import { bootstrap } from "./framework";

//импорт итогового модуля, который будет запущен функцией bootstrap
import { appModule } from "./app/app.module";


bootstrap(appModule)