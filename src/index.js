//импорт функции запуска модуля
import { bootstrap } from "./framework";

//импорт итогового модуля, который будет запущен функцией bootstrap
import { appModule } from "./app/app.module";


bootstrap(appModule)