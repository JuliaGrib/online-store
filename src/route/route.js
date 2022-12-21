const urlRoutes = {
  404: {
      template: "templates/404.html",
      title: "404 страница",
      description: "Страница не найдена",
  },
  "/": {
      template: "templates/main.html",
      title: "Главная страница",
      description: "Страница с товарами",
  },
  "basket": {
      template: "templates/basket.html",
      title: "Корзина",
      description: "Корзина товаров",
  },

}

const urlLocationHandler = async () => {
  let location = window.location.hash.replace("#", "");
  if (location.length == 0) {
    location = "/";
  }
  const route = urlRoutes[location] || urlRoutes["404"];
  const html = await fetch(route.template).then((response) => response.text());
  document.getElementById("app").innerHTML = html;
}

window.addEventListener("hashchange", urlLocationHandler);
urlLocationHandler();