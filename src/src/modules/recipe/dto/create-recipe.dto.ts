export class CreateRecipeDto {
  description: string;
  ingridients: IngredientDto[];
}

export class IngredientDto {
  name: string;
  unit: Unit;
  quantity: number;
}

export enum Unit {
  MILILITERS = 'mililiters',
  LITERS = 'LITERS',
  GRAMS = 'grams',
  KILOGRAMS = 'kilograms',
  SPOONS = 'spoons',
  CUPS = 'cups',
  PIECES = 'pieces',
}
