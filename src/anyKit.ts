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

    .anykit__modal {
      width: 400px;
      height: 600px;
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      border-radius: 0.25rem;
      background: #444f66;
      transform: scale(0);
      transform-origin: bottom right;
      opacity: 0;
      transition: all 0.25s ease-out;
    }

    .anykit__modal--show {
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

  toggleModal(_: Event) {
    const modal = document.querySelector(".anykit__modal");
    log("info", modal);
    modal?.classList.toggle("anykit__modal--show");
  }

  // render "buy BMK button"
  init() {
    const bmkButton = document.createElement("button");
    const style = document.createElement("style");
    const modal = document.createElement("div");

    style.textContent = this.baseStyles;
    bmkButton.innerHTML = this.config.button?.text || "Buy as MealKit";
    bmkButton.addEventListener("click", this.toggleModal);
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
    modal.classList.add("anykit__modal");
    document.body.appendChild(modal);
    // inject styles
    document.head.appendChild(style);
  }
}
