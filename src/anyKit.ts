import { log } from "./utils/logger";
import { parseJsonld, parseMicrodata } from "./parser";

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
    let schema = parseJsonld();
    if (!schema) {
      log(
        "info",
        "Recipe schema not available in json+ld format",
        "trying microdata format"
      );
      schema = parseMicrodata();
    }

    if (!schema) {
      log(
        "info",
        "No recipe schema found",
        "read more about Recipe schema here https://schema.org/Recipe"
      );
      return;
    }

    log("info", schema);
  }

  init() {
    // render "buy me a mealkit button"
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
    btn.classList.add("anykit__btn-hero");
    target?.appendChild(btn);
  }
}
