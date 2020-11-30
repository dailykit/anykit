import { parse } from "recipe-ingredient-parser-v2";

export type ParsedRecipeIngredient = {
  raw: string;
  parsed: {
    quantity: string;
    unit: string | null;
    ingredient: string;
    minQty: string;
    maxQty: string;
  };
};

export const parser = (ingredients: string[]) => {
  const result: ParsedRecipeIngredient[] = [];
  ingredients.forEach((ing) => {
    result.push({ raw: ing, parsed: parse(ing) });
  });

  return result;
};
