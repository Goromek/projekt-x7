

export const SEED_RECIPES = [
  {
    id: crypto.randomUUID(),
    title: "Mug brownie in 5 minutes",
    categories: ["sweet", "quick", "baking"],
    ingredients: ["4 tbsp flour", "3 tbsp cocoa", "2 tbsp sugar", "3 tbsp milk", "2 tbsp oil"],
    steps: ["Mix everything in a mug", "Microwave for 90 seconds", "Eat before it gets cold"],
    createdAt: Date.now(),
    lastUsedAt: null,
    timesUsed: 0,
  },
  {
    id: crypto.randomUUID(),
    title: "Palacinky (Slovak-style crepes)",
    categories: ["slovak", "sweet", "frying", "breakfast"],
    ingredients: ["2 eggs", "250 ml milk", "150 g flour", "pinch of salt", "jam for filling"],
    steps: [
      "Whisk eggs, milk, flour and salt into a smooth thin batter",
      "Fry thin crepes on a lightly oiled pan, ~1 minute per side",
      "Spread with jam, roll up, dust with powdered sugar",
    ],
    createdAt: Date.now(),
    lastUsedAt: null,
    timesUsed: 0,
  },
  {
    id: crypto.randomUUID(),
    title: "Post-training scrambled eggs",
    categories: ["training", "savoury", "quick", "frying"],
    ingredients: ["3 eggs", "splash of milk", "butter", "salt", "bread"],
    steps: ["Beat eggs with milk and salt", "Melt butter on LOW heat", "Stir slowly, take off the heat while still creamy"],
    createdAt: Date.now(),
    lastUsedAt: null,
    timesUsed: 0,
  },
  {
    id: crypto.randomUUID(),
    title: "Bake-together cinnamon rolls 📞",
    categories: ["sweet", "baking", "timec", "experiments"],
    ingredients: ["500 g flour", "250 ml warm milk", "7 g dry yeast", "80 g sugar", "80 g butter", "cinnamon"],
    steps: [
      "Make the dough, let it rise for 1 hour",
      "Roll out, spread butter + cinnamon + sugar",
      "Roll up, cut, proof 30 min, bake 20 min at 180°C",
      "Best enjoyed on a call together — you bring the gossip",
    ],
    createdAt: Date.now(),
    lastUsedAt: null,
    timesUsed: 0,
  },
];
