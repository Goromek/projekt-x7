

export const SEED_RECIPES = [
   {
    id: crypto.randomUUID(),
    title: "Pierogi ruskie",
    categories: ["polish", "savoury", "boiling", "timec", "dinner"],
    ingredients: [
      "500 g flour", "250 ml hot water", "1 egg", "pinch of salt",
      "500 g boiled potatoes", "250 g twaróg (farmer's cheese)",
      "1 onion", "butter", "salt & pepper",
    ],
    steps: [
      "Knead flour, hot water, egg and salt into a smooth dough; let it rest 20 min",
      "Mash the potatoes, mix with twaróg and a fried onion, season well",
      "Roll the dough thin, cut circles, put filling in, fold and pinch the edges shut",
      "Boil in salted water — scoop them out 2-3 minutes after they float",
      "Serve with fried onion, sour cream or crispy bacon bits",
    ],
    createdAt: Date.now(),
    lastUsedAt: null,
    timesUsed: 0,
  },
  {
    id: crypto.randomUUID(),
    title: "Szarlotka (Polish apple cake)",
    categories: ["polish", "sweet", "baking", "quick"],
    ingredients: [
      "400 g flour", "200 g cold butter", "100 g sugar", "2 eggs",
      "1.5 tsp baking powder", "1.5 kg apples (sour ones are best)",
      "2 tbsp sugar + cinnamon for the apples", "powdered sugar on top",
    ],
    steps: [
      "Knead a quick shortcrust dough from flour, butter, sugar, eggs and baking powder; chill 30 min",
      "Peel and grate the apples, mix with sugar and cinnamon",
      "Press half the dough into a baking pan, spread the apples, grate the rest of the dough on top",
      "Bake 50-60 min at 180°C — the oven does the actual work",
      "Dust with powdered sugar; great warm, even better the next day",
    ],
    createdAt: Date.now(),
    lastUsedAt: null,
    timesUsed: 0,
  },
    {
    id: crypto.randomUUID(),
    title: "Racuchy z jabłkami (fluffy apple pancakes)",
    categories: ["polish", "sweet", "frying", "quick", "breakfast"],
    ingredients: [
      "200 g flour", "250 ml milk", "1 egg", "1 tsp baking powder",
      "1 tbsp sugar", "pinch of salt", "2 apples", "oil for frying",
      "powdered sugar for dusting",
    ],
    steps: [
      "Whisk flour, milk, egg, baking powder, sugar and salt into a smooth batter",
      "Peel the apples and cut into thin slices (or cubes, mix them into the batter)",
      "Drop spoonfuls onto a pan with hot oil, fry golden on both sides",
      "Dust generously with powdered sugar",
      "Best eaten warm, straight from the pan — no waiting for anyone",
    ],
    createdAt: Date.now(),
    lastUsedAt: null,
    timesUsed: 0,
  },
];
