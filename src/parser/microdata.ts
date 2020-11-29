import { Recipe } from "schema-dts";
import { log } from "../utils/logger";

let recipe: Recipe;

export const parseMicrodata = (): Recipe | undefined => {
  try {
    if (recipe) return recipe;
    // get Recipe microdata scope
    const scope = document.querySelector(
      '[itemscope][itemtype="https://schema.org/Recipe"]'
    );
    if (!scope) {
      log(
        "info",
        "no microdata found on this page",
        "read more about microdata here https://schema.org/Recipe#eg-0013"
      );
      return;
    }
    // get all elements inside scope with itemprop attribute
    const micros = Array.from(
      scope.querySelectorAll<HTMLElement>("[itemprop]")
    );
    const _recipe: any = {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      mainEntityOfPage: window.location.href,
    };

    micros.forEach((micro) => {
      const { key, value } = _extractMicrodata(micro);
      _recipe[key!] = value;
    });
    recipe = _recipe;
    return _recipe as Recipe;
  } catch (error) {
    log("error", error);
  }
};

const _extractMicrodata = (el: HTMLElement) => {
  const key = el.getAttribute("itemprop");
  const value = el.getAttribute("content") || el.innerText;

  if (key === "recipeIngredient") {
    const ingredients = Array.from(
      document.querySelectorAll<HTMLElement>('[itemprop="recipeIngredient"]')
    ).map((e) => e.innerText);
    return { key, value: ingredients };
  }

  return { key, value };
};
