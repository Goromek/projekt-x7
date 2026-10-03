

import { CATEGORY_GROUPS, groupLabel, catLabel } from "../categories.js";
import { getRecipes } from "../db.js";
import { t } from "../i18n.js";
import { EASTER_EGGS } from "../content.js";

let db;
let query = "";
const activeFilters = {}; 

export function setupRecipesView(database) {
  db = database;

  document.getElementById("search-input").addEventListener("input", (e) => {
    query = e.target.value;
    refreshRecipeList();
  });

  renderFilterChips();
}

function renderFilterChips() {
  const box = document.getElementById("filter-chips");
  box.innerHTML = "";

  for (const [groupId, group] of Object.entries(CATEGORY_GROUPS)) {
    const row = document.createElement("div");
    row.className = "filter-group";

    const label = document.createElement("span");
    label.className = "filter-label";
    label.textContent = groupLabel(group);
    row.appendChild(label);

    for (const key of Object.keys(group.options)) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip chip-toggle";
      chip.textContent = catLabel(key);

      if (activeFilters[groupId]?.has(key)) chip.classList.add("chip-active");

      chip.addEventListener("click", () => {
        if (!activeFilters[groupId]) activeFilters[groupId] = new Set();
        const set = activeFilters[groupId];
        if (set.has(key)) set.delete(key);
        else set.add(key);
        renderFilterChips();
        refreshRecipeList();
      });

      row.appendChild(chip);
    }
    box.appendChild(row);
  }
}

function recipeMatches(r) {
  const q = query.trim().toLowerCase();
  if (q) {
    const inTitle = r.title.toLowerCase().includes(q);
    const inIngredients = r.ingredients.some((i) => i.toLowerCase().includes(q));
    if (!inTitle && !inIngredients) return false;
  }

  for (const keys of Object.values(activeFilters)) {
    if (keys.size === 0) continue;
    if (!r.categories.some((c) => keys.has(c))) return false;
  }
  return true;
}


export function renderRecipeList(recipes, container, emptyText) {
  container.innerHTML = "";

  if (recipes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = emptyText;
    container.appendChild(empty);
    return;
  }

  for (const r of recipes) {
    const card = document.createElement("li");
    card.className = "recipe-card";

    const link = document.createElement("a");
    link.href = `#/recipe/${r.id}`;
    link.className = "card-link";

    const title = document.createElement("h3");
    title.textContent = r.title;
    link.appendChild(title);

    const chips = document.createElement("div");
    chips.className = "chips";
    for (const cat of r.categories) {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = catLabel(cat);
      chips.appendChild(chip);
    }
    link.appendChild(chips);

    card.appendChild(link);
    container.appendChild(card);
  }
}

export async function refreshRecipeList() {
  const list = document.getElementById("recipe-list");
  const q = query.trim().toLowerCase();


  const egg = EASTER_EGGS.find((e) => q && e.words.some((w) => q.includes(w)));
  if (egg) {
    list.innerHTML = "";
    const li = document.createElement("li");
    li.className = "recipe-card easter-egg";
    li.textContent = egg.message;
    list.appendChild(li);
    return;
  }

  const recipes = await getRecipes(db);
  const filtered = recipes.filter(recipeMatches);
  const emptyText = recipes.length === 0 ? t("recipes.empty") : t("recipes.noResults");
  renderRecipeList(filtered, list, emptyText);
}
