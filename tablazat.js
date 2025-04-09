let users = [];
let editingIndex = null;

document.getElementById('userForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const city = document.getElementById('city').value.trim();
  const position = document.getElementById('position').value.trim();

  // Validáció JS oldalról is (HTML5 mellett)
  if (name.length < 2 || name.length > 20) return alert("A név 2 és 20 karakter között kell legyen.");
  if (city.length < 2 || city.length > 20) return alert("A város 2 és 20 karakter között kell legyen.");

  const newUser = { name, email, city, position };

  if (editingIndex === null) {
    users.push(newUser);
  } else {
    users[editingIndex] = newUser;
    editingIndex = null;
  }

  this.reset();
  renderTable();
});

function renderTable(filteredData = null) {
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";

  (filteredData || users).forEach((user, index) => {
    const row = tbody.insertRow();

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.city}</td>
      <td>${user.position}</td>
      <td>
        <button onclick="editUser(${index})">Szerkesztés</button>
        <button onclick="deleteUser(${index})">Törlés</button>
      </td>
    `;
  });
}

function editUser(index) {
  const user = users[index];
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('city').value = user.city;
  document.getElementById('position').value = user.position;
  editingIndex = index;
}

function deleteUser(index) {
  if (confirm("Biztosan törölni szeretnéd?")) {
    users.splice(index, 1);
    renderTable();
  }
}

// Rendezi az oszlopot
function sortTable(columnIndex) {
  users.sort((a, b) => {
    const valA = Object.values(a)[columnIndex].toLowerCase();
    const valB = Object.values(b)[columnIndex].toLowerCase();
    return valA.localeCompare(valB);
  });
  renderTable();
}

// Szűrés / keresés
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const filtered = users.filter(user =>
    Object.values(user).some(val => val.toLowerCase().includes(keyword))
  );
  renderTable(filtered);
});
