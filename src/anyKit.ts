import { log } from "./utils/logger";

type options = {
  button: {
    location?: string;
    text?: string;
  };
};

export class AnyKit {
  config: options;
  constructor(config: options) {
    this.config = config;

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
      .then((req) => {
        log("info", req.status);
        return req.json();
      })
      .then((res) => {
        log("info", res);
      });
  }

  init() {
    // render "buy me a mealkit button"
    const btn = document.createElement("button");
    btn.innerHTML = this.config.button.text || "Buy as MealKit";
    btn.classList.add("anykit__btn-hero");

    if (this.config.button.location) {
      const target = document.querySelector(this.config.button.location);

      if (!target) {
        log(
          "error",
          new Error(
            `no element found on this page with target=${this.config.button.location}`
          )
        );
        return;
      }

      target?.appendChild(btn);
    } else {
      btn.classList.add("anykit__btn-fixed");
      document.body.appendChild<HTMLButtonElement>(btn);
    }
  }
}
