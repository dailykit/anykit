import { Recipe } from "schema-dts";
import { log } from "./logger";

let recipe: Recipe;

export const parseJsonld = (): Recipe | undefined => {
  // read more about "Recipe" schema here https://schema.org/Recipe
  // get all json+ld script tags and filter out every schema except "Recipe"
  try {
    if (recipe) return recipe;

    const sources = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    )
      .map((c) => JSON.parse(c.textContent!))
      .filter((s) => s["@type"] === "Recipe");

    // At this point, the script expects only one schema for "Recipe". The first schema in sources will be used
    recipe = sources[0];
    return sources[0];
  } catch (error) {
    log("error", error);
  }
};
