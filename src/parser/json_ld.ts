import { Recipe } from "schema-dts";
import { log } from "../utils/logger";
import { parser, ParsedRecipeIngredient } from "./parseIngredients";

export interface RecipeSchema extends Recipe {
  recipeIngreident: ParsedRecipeIngredient[];
}

let recipe: RecipeSchema;

export const parseJsonld = (): RecipeSchema | undefined => {
  // read more about "Recipe" schema here https://schema.org/Recipe
  // get all json+ld script tags and filter out every schema except "Recipe"
  try {
    if (recipe) return recipe;

    const sources = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    )
      .map((c) => JSON.parse(c.textContent!))
      .filter((s) => s["@type"] === "Recipe");

    // At this point, the script expects only one schema for "Recipe".
    // Hence, the first schema in sources will be used
    const parsedIngredients = parser(sources[0].recipeIngredient);
    sources[0].recipeIngredient = parsedIngredients;
    recipe = sources[0];
    return sources[0];
  } catch (error) {
    log("error", error);
  }
};
