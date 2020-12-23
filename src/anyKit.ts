import { log } from "./utils/logger";

type options = {
  button?: {
    location?: string;
    text?: string;
  };
};

export class AnyKit {
  config: options;
  baseStyles = `
    .anykit__btn {
      background-color: tomato;
      color: white;
      padding: 1.25rem;
      border: 0;
      border-radius: 0.25rem;
      cursor: pointer;
    }

    .anykit__btn:hover {
      filter: brightness(0.9);
    }
  `;

  fixedStyles = `
    .anykit__btn--fixed {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 10000
    }
  `;

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

  // render "buy BMK button"
  init() {
    const btn = document.createElement("button");
    const style = document.createElement("style");
    style.textContent = this.baseStyles;
    btn.innerHTML = this.config.button?.text || "Buy as MealKit";
    btn.classList.add("anykit__btn");
    if (this.config.button?.location) {
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
      btn.classList.add("anykit__btn--fixed");
      style.textContent += this.fixedStyles;
      document.body.appendChild<HTMLButtonElement>(btn);
    }
    document.head.appendChild(style);
  }
}
