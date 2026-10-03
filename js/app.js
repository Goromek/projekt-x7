

import { openDb, getRecipes, saveRecipe, getRecipe } from "./db.js";
import { SEED_RECIPES } from "./seed.js";
import { applyTranslations } from "./i18n.js";
import { setupRecipesView, refreshRecipeList } from "./views/recipes.js";
import { renderRecipeDetail } from "./views/detail.js";
import { setupForm, resetForm, fillForm } from "./views/form.js";
import { renderHome } from "./views/home.js";
import { renderSettings } from "./views/settings.js";


const trasy = {
  home: "view-home",
  recipes: "view-recipes",
  recipe: "view-recipe-detail",
  edit: "view-add",
  add: "view-add",
  settings: "view-settings",
};

let db;

async function showScreen() {
  const hash = location.hash || "#/home";
  const [view, param] = hash.slice(2).split("/");

  for (const sekcja of document.querySelectorAll("section")) {
    sekcja.classList.add("hidden");
  }

  const idSekcji = trasy[view] ?? "view-home";
  document.getElementById(idSekcji).classList.remove("hidden");

 
  const activeView = view === "recipe" ? "recipes" : view === "edit" ? "add" : view;
  for (const adress of document.querySelectorAll("footer a")) {
    adress.classList.toggle("active", adress.getAttribute("href") === "#/" + activeView);
  }


  if (view === "home") renderHome(db);
  if (view === "recipes") refreshRecipeList();
  if (view === "recipe") showRecipeDetail(param);
  if (view === "add") resetForm();
  if (view === "edit") {
    const recipe = await getRecipe(db, param);
    if (recipe) await fillForm(recipe);
    else location.hash = "#/recipes"; 
  }
  if (view === "settings") renderSettings();
}

async function showRecipeDetail(id) {
  const recipe = await getRecipe(db, id);
  await renderRecipeDetail(recipe, document.getElementById("view-recipe-detail"), db);
}

async function init() {
  db = await openDb();


  if (!localStorage.getItem("seeded")) {
    for (const recipe of SEED_RECIPES) {
      await saveRecipe(db, recipe);
    }
    localStorage.setItem("seeded", "1");
    console.log("Seed loaded!");
  }

  setupForm(db);
  setupRecipesView(db);
  applyTranslations();
  showScreen();
}

init();
window.addEventListener("hashchange", showScreen);


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
