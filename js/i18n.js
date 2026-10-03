

export const STRINGS = {
  en: {
    "nav.home": "Home",
    "nav.recipes": "Recipes",
    "nav.add": "Add",
    "nav.settings": "Settings",

    "home.greeting": "Hi, Afrodita! 💛",
    "home.oneMore": "One more ✨",
    "home.recentAdded": "Recently added",
    "home.recentCooked": "Recently cooked",

    "recipes.title": "Recipes",
    "recipes.search": "Search recipes…",
    "recipes.empty": "No recipes yet — add your first one!",
    "recipes.noResults": "Nothing found 😕",

    "detail.back": "← Back to recipes",
    "detail.ingredients": "Ingredients",
    "detail.steps": "Steps",
    "detail.createdOn": "Created on:",
    "detail.edit": "Edit",
    "detail.delete": "Delete",
    "detail.deleteConfirm": "Really delete this recipe?",
    "detail.notFound": "Recipe not found!",
    "detail.cooked": "Cooked it! 👩‍🍳",
    "detail.cookedToast": "Dobrú chuť! 😋",

    "form.newTitle": "New recipe",
    "form.editTitle": "Edit recipe",
    "form.title": "Title",
    "form.categories": "Categories",
    "form.ingredients": "Ingredients",
    "form.steps": "Steps",
    "form.addIngredient": "+ Add ingredient",
    "form.addStep": "+ Add step",
    "form.save": "Save recipe",
    "form.photo": "Photo",
    "form.removePhoto": "Remove photo",

    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.madeWith": "Made with 💛 just for you",
  },

  sk: {
    "nav.home": "Domov",
    "nav.recipes": "Recepty",
    "nav.add": "Pridať",
    "nav.settings": "Nastavenia",

    "home.greeting": "Ahoj, Afrodita! 💛",
    "home.oneMore": "Ešte jeden ✨",
    "home.recentAdded": "Naposledy pridané",
    "home.recentCooked": "Naposledy varené",

    "recipes.title": "Recepty",
    "recipes.search": "Hľadať recept…",
    "recipes.empty": "Zatiaľ žiadne recepty — pridaj prvý!",
    "recipes.noResults": "Nič sa nenašlo 😕",

    "detail.back": "← Späť na recepty",
    "detail.ingredients": "Suroviny",
    "detail.steps": "Postup",
    "detail.createdOn": "Pridané:",
    "detail.edit": "Upraviť",
    "detail.delete": "Zmazať",
    "detail.deleteConfirm": "Naozaj zmazať tento recept?",
    "detail.notFound": "Recept sa nenašiel!",
    "detail.cooked": "Uvarené! 👩‍🍳",
    "detail.cookedToast": "Dobrú chuť! 😋",

    "form.newTitle": "Nový recept",
    "form.editTitle": "Upraviť recept",
    "form.title": "Názov",
    "form.categories": "Kategórie",
    "form.ingredients": "Suroviny",
    "form.steps": "Postup",
    "form.addIngredient": "+ Pridať surovinu",
    "form.addStep": "+ Pridať krok",
    "form.save": "Uložiť recept",
    "form.photo": "Fotka",
    "form.removePhoto": "Odstrániť fotku",

    "settings.title": "Nastavenia",
    "settings.language": "Jazyk",
    "settings.madeWith": "Vyrobené s 💛 len pre teba",
  },
};

export function getLang() {
  return localStorage.getItem("lang") || "en";
}

export function setLang(lang) {
  localStorage.setItem("lang", lang);
}


export function t(key) {
  const lang = getLang();
  return STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
}


export function applyTranslations() {
  for (const el of document.querySelectorAll("[data-i18n]")) {
    el.textContent = t(el.dataset.i18n);
  }
  for (const el of document.querySelectorAll("[data-i18n-placeholder]")) {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  }
}
