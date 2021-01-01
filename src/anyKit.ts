import { log } from "./utils/logger";

type options = {
  button?: {
    location?: string;
    text?: string;
  };
};

export class AnyKit {
  config: options;
  modal = document.createElement("div");
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

    .anykit__modal {
      display: none;
      transform: scale(0);
      opacity: 0;
      transition: all 0.2s ease-out;
    }

    .anykit__modal--show {
      display: block;
      transform: scale(1);
      opacity: 1;
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

  showModal(_: Event) {
    this.modal.classList.toggle("anykit__modal--show");
  }

  // render "buy BMK button"
  init() {
    const bmkButton = document.createElement("button");
    const style = document.createElement("style");

    style.textContent = this.baseStyles;
    bmkButton.innerHTML = this.config.button?.text || "Buy as MealKit";
    bmkButton.addEventListener("click", this.showModal);
    bmkButton.classList.add("anykit__btn");
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
      target?.appendChild(bmkButton);
    } else {
      bmkButton.classList.add("anykit__btn--fixed");
      style.textContent += this.fixedStyles;
      document.body.appendChild<HTMLButtonElement>(bmkButton);
    }
    this.modal.classList.add("anykit__modal");
    document.body.appendChild(this.modal);
    // inject styles
    document.head.appendChild(style);
  }
}
