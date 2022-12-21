class Route { 
  
  private urlRoutes: any = {
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
    "cart": {
        template: "templates/cart.html",
        title: "Корзина",
        description: "Корзина товаров",
    },
  
  }
  
  async urlLocationHandler(): Promise<void> {
    let location: string = window.location.hash.replace("#", "");
    if (location.length == 0) {
      location = "/";
    }
    const route: any  = this.urlRoutes[location] || this.urlRoutes["404"];
    const html = await fetch(route.template).then((response) => response.text());
    (document.getElementById("app") as HTMLElement).innerHTML = html;
  }

  startRoute(): void {
    window.addEventListener("hashchange",this.urlLocationHandler);
    this.urlLocationHandler();
  }
  
}

export default Route

