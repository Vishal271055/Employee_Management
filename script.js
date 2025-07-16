let employeeId = 1;

document.getElementById("employee-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value;
  const position = document.getElementById("position").value.trim();

  if (!name || !age || !gender || !position) return;

  const table = document.getElementById("employee-list");
  const row = table.insertRow();

  row.innerHTML = `
    <td>${employeeId++}</td>
    <td contenteditable="true">${name}</td>
    <td contenteditable="true">${age}</td>
    <td contenteditable="true">${gender}</td>
    <td contenteditable="true">${position}</td>
    <td>
      <button class="save-btn">Save</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;
  row.querySelector(".save-btn").addEventListener("click", function () {
    alert("Employee details saved!");
  });

  row.querySelector(".delete-btn").addEventListener("click", function () {
    row.remove();
    updateTotal();
  });

  document.getElementById("employee-form").reset();
  updateTotal();
});

document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const rows = document.querySelectorAll("#employee-list tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(value) ? "" : "none";
  });
});

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("current-time").textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock(); 

function updateTotal() {
  const count = document.querySelectorAll("#employee-list tr").length;
  document.getElementById("total-count").textContent = count;
}

document.getElementById("export-btn").addEventListener("click", function () {
  const rows = document.querySelectorAll("#employee-table tr");
  let csv = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll("td, th");
    const rowData = [];
    cols.forEach(col => rowData.push(col.innerText));
    csv.push(rowData.join(","));
  });

  const csvString = csv.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "employees.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
