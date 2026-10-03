

import { CATEGORY_GROUPS, groupLabel, catLabel } from "../categories.js";
import { saveRecipe, savePhoto, getPhoto, deletePhoto } from "../db.js";
import { t } from "../i18n.js";

let db;
let editing = null;     
let selectedFile = null; 
let removePhoto = false;

const form = document.getElementById("recipe-form");

function renderCategoryPicker(container) {
  for (const group of Object.values(CATEGORY_GROUPS)) {
    const wrap = document.createElement("div");
    wrap.className = "cat-group";

    const header = document.createElement("h4");
    header.textContent = groupLabel(group);
    wrap.appendChild(header);

    for (const key of Object.keys(group.options)) {
      const lbl = document.createElement("label");
      lbl.className = "cat-option";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.name = "cat";
      cb.value = key;

      lbl.appendChild(cb);
      lbl.append(catLabel(key));
      wrap.appendChild(lbl);
    }
    container.appendChild(wrap);
  }
}


function addIngredientRow(initialValue = "") {
  const row = document.createElement("div");
  row.className = "form-row";

  const input = document.createElement("input");
  input.type = "text";
  input.value = initialValue;
  input.placeholder = "e.g. 200g flour";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "btn-remove";
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => row.remove());

  row.appendChild(input);
  row.appendChild(removeBtn);
  document.getElementById("f-ingredients").appendChild(row);
}

function addStepRow(initialValue = "") {
  const row = document.createElement("div");
  row.className = "form-row";

  const textarea = document.createElement("textarea");
  textarea.value = initialValue;
  textarea.placeholder = "e.g. Mix everything in a mug";
  textarea.rows = 2;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "btn-remove";
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => row.remove());

  row.appendChild(textarea);
  row.appendChild(removeBtn);
  document.getElementById("f-steps").appendChild(row);
}

function collectValues() {
  const title = document.getElementById("f-title").value.trim();

  const categories = [];
  for (const cb of document.querySelectorAll('input[name="cat"]:checked')) {
    categories.push(cb.value);
  }

  const ingredients = [];
  for (const input of document.querySelectorAll("#f-ingredients input")) {
    const v = input.value.trim();
    if (v) ingredients.push(v);
  }

  const steps = [];
  for (const ta of document.querySelectorAll("#f-steps textarea")) {
    const v = ta.value.trim();
    if (v) steps.push(v);
  }

  return { title, categories, ingredients, steps };
}

function showPhotoPreview(blobOrFile) {
  const preview = document.getElementById("f-photo-preview");
  preview.src = URL.createObjectURL(blobOrFile);
  preview.classList.remove("hidden");
  document.getElementById("remove-photo").classList.remove("hidden");
}

function clearPhotoPreview() {
  const preview = document.getElementById("f-photo-preview");
  preview.src = "";
  preview.classList.add("hidden");
  document.getElementById("remove-photo").classList.add("hidden");
}


export async function fillForm(recipe) {
  form.reset();
  editing = recipe;
  selectedFile = null;
  removePhoto = false;

  document.getElementById("form-heading").textContent = t("form.editTitle");
  document.getElementById("f-title").value = recipe.title;

  for (const cb of document.querySelectorAll('input[name="cat"]')) {
    cb.checked = recipe.categories.includes(cb.value);
  }

  document.getElementById("f-ingredients").innerHTML = "";
  for (const ing of recipe.ingredients) addIngredientRow(ing);

  document.getElementById("f-steps").innerHTML = "";
  for (const step of recipe.steps) addStepRow(step);

 
  clearPhotoPreview();
  const blob = await getPhoto(db, recipe.id);
  if (blob) showPhotoPreview(blob);
}


export function resetForm() {
  editing = null;
  selectedFile = null;
  removePhoto = false;

  document.getElementById("form-heading").textContent = t("form.newTitle");
  form.reset();
  clearPhotoPreview();

  document.getElementById("f-ingredients").innerHTML = "";
  document.getElementById("f-steps").innerHTML = "";
  addIngredientRow();
  addIngredientRow();
  addStepRow();
}

export function setupForm(database) {
  db = database;

  renderCategoryPicker(document.getElementById("f-categories"));


  document.getElementById("add-ingredient").addEventListener("click", () => addIngredientRow());
  document.getElementById("add-step").addEventListener("click", () => addStepRow());


  document.getElementById("f-photo").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    selectedFile = file;
    removePhoto = false;
    showPhotoPreview(file);
  });

  document.getElementById("remove-photo").addEventListener("click", () => {
    selectedFile = null;
    removePhoto = true;
    document.getElementById("f-photo").value = "";
    clearPhotoPreview();
  });

 
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { title, categories, ingredients, steps } = collectValues();

    const recipe = {
      id: editing ? editing.id : crypto.randomUUID(),
      title,
      categories,
      ingredients,
      steps,
      createdAt: editing ? editing.createdAt : Date.now(),
      lastUsedAt: editing ? editing.lastUsedAt : null,
      timesUsed: editing ? editing.timesUsed || 0 : 0,
    };

    await saveRecipe(db, recipe);

    if (selectedFile) await savePhoto(db, recipe.id, selectedFile);
    else if (removePhoto) await deletePhoto(db, recipe.id);

    editing = null;
    selectedFile = null;
    removePhoto = false;
    location.hash = "#/recipes";
  });
}
