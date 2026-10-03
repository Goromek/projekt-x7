

import { catLabel } from "../categories.js";
import { getPhoto, saveRecipe, deleteRecipe } from "../db.js";
import { t } from "../i18n.js";

export async function renderRecipeDetail(recipe, container, db) {
  container.innerHTML = "";

  if (!recipe) {
    const msg = document.createElement("p");
    msg.className = "empty-state";
    msg.textContent = t("detail.notFound");
    container.appendChild(msg);
    return;
  }

  const box = document.createElement("div");
  box.className = "detail";

  const back = document.createElement("a");
  back.href = "#/recipes";
  back.className = "back-link";
  back.textContent = t("detail.back");
  box.appendChild(back);

  const title = document.createElement("h2");
  title.textContent = recipe.title;
  box.appendChild(title);

  const chips = document.createElement("div");
  chips.className = "chips";
  for (const cat of recipe.categories) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = catLabel(cat);
    chips.appendChild(chip);
  }
  box.appendChild(chips);

  const date = document.createElement("h4");
  date.textContent = t("detail.createdOn") + " " + new Date(recipe.createdAt).toLocaleDateString();
  box.appendChild(date);

  
  const blob = await getPhoto(db, recipe.id);
  if (blob) {
    const img = document.createElement("img");
    img.className = "detail-photo";
    img.src = URL.createObjectURL(blob);
    img.alt = recipe.title;
    box.appendChild(img);
  }

  const ingHeader = document.createElement("h3");
  ingHeader.textContent = t("detail.ingredients");
  box.appendChild(ingHeader);

  const ingList = document.createElement("ul");
  for (const ing of recipe.ingredients) {
    const li = document.createElement("li");
    li.textContent = ing;
    ingList.appendChild(li);
  }
  box.appendChild(ingList);

  const stepsHeader = document.createElement("h3");
  stepsHeader.textContent = t("detail.steps");
  box.appendChild(stepsHeader);

  const stepsList = document.createElement("ol");
  for (const step of recipe.steps) {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.appendChild(li);
  }
  box.appendChild(stepsList);


  const actions = document.createElement("div");
  actions.className = "detail-actions";

  
  const editLink = document.createElement("a");
  editLink.href = `#/edit/${recipe.id}`;
  editLink.className = "btn-secondary";
  editLink.textContent = t("detail.edit");


  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-danger";
  deleteBtn.textContent = t("detail.delete");
  deleteBtn.addEventListener("click", async () => {
    if (confirm(t("detail.deleteConfirm"))) {
      await deleteRecipe(db, recipe.id);
      location.hash = "#/recipes";
    }
  });


  const cookedBtn = document.createElement("button");
  cookedBtn.className = "btn-primary";
  cookedBtn.textContent = t("detail.cooked");
  cookedBtn.addEventListener("click", async () => {
    recipe.lastUsedAt = Date.now();
    recipe.timesUsed = (recipe.timesUsed || 0) + 1;
    await saveRecipe(db, recipe);
    confetti();
    toast(t("detail.cookedToast"));
  });

  actions.appendChild(cookedBtn);
  actions.appendChild(editLink);
  actions.appendChild(deleteBtn);
  box.appendChild(actions);

  container.appendChild(box);
}


function confetti() {
  const emojis = ["🎉", "✨", "💛", "🍓", "🥳", "🧁"];
  for (let i = 0; i < 24; i++) {
    const span = document.createElement("span");
    span.className = "confetti";
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDelay = Math.random() * 0.4 + "s";
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 2200);
  }
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2400);
}
