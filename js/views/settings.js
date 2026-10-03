

import { getLang, setLang, t, applyTranslations } from "../i18n.js";

export function renderSettings() {
  const container = document.getElementById("view-settings");
  container.innerHTML = "";

  const box = document.createElement("div");
  box.className = "detail";

  const title = document.createElement("h2");
  title.textContent = t("settings.title");
  box.appendChild(title);

  const field = document.createElement("div");
  field.className = "field";

  const label = document.createElement("span");
  label.textContent = t("settings.language");
  field.appendChild(label);

  const options = [
    { value: "en", name: "English" },
    { value: "sk", name: "Slovenčina" },
  ];

  for (const opt of options) {
    const lbl = document.createElement("label");
    lbl.className = "cat-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "lang";
    radio.value = opt.value;
    radio.checked = getLang() === opt.value;

    
    radio.addEventListener("change", () => {
      setLang(opt.value);
      applyTranslations();
      location.reload();
    });

    lbl.appendChild(radio);
    lbl.append(opt.name);
    field.appendChild(lbl);
  }

  box.appendChild(field);

  const signature = document.createElement("p");
  signature.className = "muted signature";
  signature.textContent = t("settings.madeWith");
  box.appendChild(signature);

  container.appendChild(box);
}
