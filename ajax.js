const axios= window.axios;

const API_URL = "https://example.com/AjaxApi.php/http://gamf.nhely.hu/ajax2/"; // Vagy használd a saját API-d

// Segédfüggvény validációhoz
function isValidInput(...fields) {
  return fields.every(field => field.trim() !== "" && field.length <= 30);
}

// READ
document.getElementById("loadData").addEventListener("click", async () => {
  const list = document.getElementById("dataList");
  const stats = document.getElementById("heightStats");
  list.innerHTML = "Betöltés...";
  try {
    const res = await axios.post(API_URL, {op:"read", code:"L5ODX6ASDFGH"});
    const data = res.data.list || res.data ;

    let html = "";
    const heights = [];

    data.forEach(user => {
      html += `<p><strong>${user.name}</strong> – Súly: ${user.weight}, Magasság: ${user.height}</p>`;
      if (!isNaN(user.height)) heights.push(user.height);
    });

    list.innerHTML = html;

    if (heights.length > 0) {
      const sum = heights.reduce((a, b) => a + b, 0);
      const avg = (sum / heights.length).toFixed(2);
      const max = Math.max(...heights);
      stats.innerHTML = `<p>Magasság összeg: ${sum} | Átlag: ${avg} | Legnagyobb: ${max}</p>`;
    } else {
      stats.innerHTML = "";
    }
  } catch (err) {
    list.innerHTML = "Hiba történt az adatok lekérésekor.";
  }
});

// CREATE
document.getElementById("createBtn").addEventListener("click", async () => {
  const name = document.getElementById("createName").value;
  const weight = document.getElementById("createWeight").value;
  const height = document.getElementById("createHeight").value;
  const msg = document.getElementById("createMsg");

  if (!isValidInput(name, weight, height)) {
    msg.textContent = "Hibás vagy hiányzó mezők (max 30 karakter, nem lehet üres).";
    return;
  }

  try {
    const res = await axios.post(API_URL, {op:"create", code:"L5ODX6ASDFGH", name: name, height: height, weight:weight });
    msg.textContent = `Sikeres létrehozás: ID ${res.data.id}`;
  } catch (err) {
    msg.textContent = "Hiba történt a létrehozás során.";
  }
});

// UPDATE
document.getElementById("updateBtn").addEventListener("click", async () => {
  const id = document.getElementById("updateId").value;
  const name = document.getElementById("updateName").value;
  const weight = document.getElementById("updateWeight").value;
  const height = document.getElementById("updateHeight").value;
  const msg = document.getElementById("updateMsg");

  if (!isValidInput(name, weight, height)) {
    msg.textContent = "Hibás vagy hiányzó mezők (max 30 karakter, nem lehet üres).";
    return;
  }

  try {
    await axios.post(API_URL, {op:"update", code:"L5ODX6ASDFGH", name: name, height: height, weight:weight, id:id });
    msg.textContent = "Sikeres módosítás.";
  } catch {
    msg.textContent = "Hiba történt a módosítás során.";
  }
});   

// DELETE
document.getElementById("deleteBtn").addEventListener("click", async () => {
  const id = document.getElementById("deleteId").value;
  const msg = document.getElementById("deleteMsg");
  try {
    await axios.post(API_URL, {op:"delete", code:"L5ODX6ASDFGH", id:id });
    msg.textContent = "Sikeres törlés.";
  } catch {
    msg.textContent = "Hiba történt a törlés során.";
  }
});
