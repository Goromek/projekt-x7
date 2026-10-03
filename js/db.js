


function asPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const DB_VERSION = 2; 

export function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("afrodyta", DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("recipes")) {
        db.createObjectStore("recipes", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("photos")) {
        db.createObjectStore("photos", { keyPath: "recipeId" });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}


function getStore(db, storeName, mode) {
  return db.transaction(storeName, mode).objectStore(storeName);
}


export async function getRecipes(db) {
  return await asPromise(getStore(db, "recipes", "readonly").getAll());
}

export async function getRecipe(db, id) {
  return await asPromise(getStore(db, "recipes", "readonly").get(id));
}

export async function saveRecipe(db, recipe) {
  return await asPromise(getStore(db, "recipes", "readwrite").put(recipe));
}

export async function deleteRecipe(db, id) {
  await asPromise(getStore(db, "recipes", "readwrite").delete(id));
  await asPromise(getStore(db, "photos", "readwrite").delete(id)); 
}


export async function savePhoto(db, recipeId, blob) {
  return await asPromise(getStore(db, "photos", "readwrite").put({ recipeId, blob }));
}

export async function getPhoto(db, recipeId) {
  const record = await asPromise(getStore(db, "photos", "readonly").get(recipeId));
  return record ? record.blob : undefined;
}

export async function deletePhoto(db, recipeId) {
  return await asPromise(getStore(db, "photos", "readwrite").delete(recipeId));
}
