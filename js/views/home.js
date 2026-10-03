

import { getRecipes } from "../db.js";
import { t } from "../i18n.js";
import { catLabel } from "../categories.js";
import { COMPLIMENTS, BIRTHDAY_ISO, BIRTHDAY_MESSAGE, BIRTHDAY_LOCKED } from "../content.js";


function pickCompliment() {
  const last = Number(localStorage.getItem("lastCompliment") ?? -1);
  let idx;
  do {
    idx = Math.floor(Math.random() * COMPLIMENTS.length);
  } while (idx === last && COMPLIMENTS.length > 1);
  localStorage.setItem("lastCompliment", String(idx));
  return COMPLIMENTS[idx];
}


function birthdayCard() {
  const card = document.createElement("div");
  card.className = "birthday-card";

  const bday = new Date(BIRTHDAY_ISO + "T00:00:00");
  const today = new Date();

  if (today >= bday) {
    card.textContent = BIRTHDAY_MESSAGE;
  } else {
    const days = Math.ceil((bday - today) / 86400000);
    card.textContent = BIRTHDAY_LOCKED.replace("{days}", days);
  }
  return card;
}


function miniSection(headerText, recipes) {
  const wrap = document.createElement("div");

  const h = document.createElement("h3");
  h.textContent = headerText;
  wrap.appendChild(h);

  if (recipes.length === 0) {
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = "—";
    wrap.appendChild(p);
    return wrap;
  }

  for (const r of recipes) {
    const a = document.createElement("a");
    a.className = "mini-card";
    a.href = `#/recipe/${r.id}`;

    const title = document.createElement("strong");
    title.textContent = r.title;
    a.appendChild(title);

    if (r.categories.length) {
      const small = document.createElement("small");
      small.textContent = r.categories.map(catLabel).join(" · ");
      a.appendChild(small);
    }
    wrap.appendChild(a);
  }
  return wrap;
}

export async function renderHome(db) {
  const container = document.getElementById("view-home");
  container.innerHTML = "";

  const box = document.createElement("div");
  box.className = "detail";

  const hello = document.createElement("h2");
  hello.textContent = t("home.greeting");
  box.appendChild(hello);


  const compCard = document.createElement("div");
  compCard.className = "compliment-card";
  const comp = document.createElement("p");
  comp.textContent = pickCompliment();
  const more = document.createElement("button");
  more.type = "button";
  more.className = "btn-link";
  more.textContent = t("home.oneMore");
  more.addEventListener("click", () => {
    comp.textContent = pickCompliment();
  });
  compCard.appendChild(comp);
  compCard.appendChild(more);
  box.appendChild(compCard);

  box.appendChild(birthdayCard());

  const recipes = await getRecipes(db);
  const byCreated = [...recipes].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
  const byCooked = recipes
    .filter((r) => r.lastUsedAt)
    .sort((a, b) => b.lastUsedAt - a.lastUsedAt)
    .slice(0, 3);

  box.appendChild(miniSection(t("home.recentAdded"), byCreated));
  box.appendChild(miniSection(t("home.recentCooked"), byCooked));

  container.appendChild(box);
}
