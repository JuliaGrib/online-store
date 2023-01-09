import "./app/styles/normalize.css"
import "./app/styles/404.css"
import "./app/styles/header.css"
import "./app/styles/cart.css"
import "./app/styles/main-page.css"
import "./app/styles/about.css"
import { bootstrap } from "./framework";
import { appModule } from "./app/app.module";
import "./framework/tools/storage";

bootstrap(appModule)