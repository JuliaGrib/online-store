import Route from "../route/route";

class App {

  constructor() {
    console.log("УРА");
  }

  start(): void {
    const route: Route = new Route();
    route.startRoute();
  }

}

export default App;