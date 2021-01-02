import { AnykitApp } from "./components/anykitApp";
import { log } from "./utils/logger";

type options = {
  isManual: boolean;
};

declare global {
  interface Window {
    anykitConfig: options;
    Anykit: typeof AnyKit;
  }
}

class AnyKit {
  config: options;
  constructor(config: options = { isManual: false }) {
    this.config = config;
    window.anykitConfig = config;
    const { location } = window;

    // send page url to anykit-server
    fetch("https://anykit-server.herokuapp.com/recipes", {
      method: "POST",
      body: JSON.stringify({
        recipeUrl: location.toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(req => {
        log("info", req.status);
        return req.json();
      })
      .then(res => {
        log("info", res);
        customElements.define("anykit-app", AnykitApp);
      });
  }
}

window.Anykit = AnyKit;
