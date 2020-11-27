import { log } from "./utils/logger";

type options = {
  type: "manual" | "auto";
  ingredients: string;
  steps: string;
  inventory: string;
  button: {
    location: string;
    text?: string;
  };
};

export class AnyKit {
  config: options;
  constructor(config: options) {
    this.config = config;
  }

  showModal(e: MouseEvent) {
    console.log("show modal fn called", e);
  }

  renderBtn() {
    const btn = document.createElement("button");
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

    btn.innerHTML = this.config.button.text || "Buy as MealKit";
    btn.addEventListener("click", this.showModal);
    btn.classList.add("anykit__btn-hero");
    target?.appendChild(btn);
  }

  init() {
    // render "buy me a mealkit button"
    this.renderBtn();
  }
}
