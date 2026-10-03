

export const CATEGORY_GROUPS = {
  method: {
    label: { en: "Method", sk: "Spôsob" },
    options: {
      baking: { en: "Baking", sk: "Pečenie" },
      roasting: { en: "Roasting", sk: "Opekanie" },
      boiling: { en: "Boiling", sk: "Varenie" },
      frying: { en: "Frying", sk: "Vyprážanie" },
    },
  },
  taste: {
    label: { en: "Taste", sk: "Chuť" },
    options: {
      savoury: { en: "Savoury", sk: "Slané" },
      sweet: { en: "Sweet tooth", sk: "Sladké" },
      mild: { en: "Mild", sk: "Jemné" },
      spicy: { en: "Spicy & Hot (like u)", sk: "Pikantné (ako ty 😉)" },
      sour: { en: "Sour", sk: "Kyslé" },
    },
  },
  meal: {
    label: { en: "Meal", sk: "Jedlo" },
    options: {
      breakfast: { en: "Breakfast", sk: "Raňajky" },
      lunch: { en: "Lunch time", sk: "Obed" },
      dinner: { en: "Dinner", sk: "Večera" },
      training: { en: "Post-training fuel", sk: "Po tréningu" },
    },
  },
  effort: {
    label: { en: "Effort", sk: "Náročnosť" },
    options: {
      quick: { en: "Quick & easy", sk: "Rýchle a jednoduché" },
      timec: { en: "Time-consuming", sk: "Časovo náročné" },
    },
  },
  origin: {
    label: { en: "Style", sk: "Štýl" },
    options: {
      slovak: { en: "Slovak classics", sk: "Slovenská klasika" },
      polish: { en: "Polish things ;D", sk: "Poľské dobroty ;D" },
      experiments: { en: "EXPERIMENTS", sk: "Experimenty" },
      other: { en: "Other", sk: "Iné" },
    },
  },
};

function lang() {
  return localStorage.getItem("lang") || "en";
}


export function catLabel(key) {
  for (const group of Object.values(CATEGORY_GROUPS)) {
    if (group.options[key]) return group.options[key][lang()] ?? group.options[key].en;
  }
  return key; 
}


export function groupLabel(group) {
  return group.label[lang()] ?? group.label.en;
}
