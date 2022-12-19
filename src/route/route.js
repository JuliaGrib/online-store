//убираем действия по умолчанию у ссылок в хеадере
document.addEventListener("click", (e) => {
    const {target} = e;
    if(!target.matches("header a")){
        return;
    }
    e.preventDefault();
    urlRoute();
})

//массив с маршрутами
const urlRoutes = {
    404: {
        template: "templates//404.html",
        title: "404 страница",
        description: "Страница не найдена",
    },
    "/": {
        template: "templates/main.html",
        title: "Главная страница",
        description: "Страница с товарами",
    },
    "/basket": {
        template: "templates/basket.html",
        title: "Корзина",
        description: "Корзина товаров",
    },

}


//меняем историю браузера в браузерной строке
const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
}

const urlLocationHandler = async () => {
    const location = window.location.pathname;
    // if (location.length == 0) {
    //     location = "/";
    // }

    const route = urlRoutes[location] || urlRoutes[404];
    console.log(route.template);


    const html = await fetch(route.template).then((response) => response.text());

    document.getElementById("app").innerHTML = html;
}


window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();




