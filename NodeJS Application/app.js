const systems = [
  { name: "ATE01", ip: "127.0.0.1" },
  { name: "ATE02", ip: "127.0.0.2" },
  { name: "ATE03", ip: "127.0.0.3" },
  { name: "ATE04", ip: "127.0.0.4" }
];

let selectedSystem = null;
let previousObjectUrl = null;
let imageInterval = null;
let statusInterval = null;

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username && password) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    showSection('home');
    renderHomeScreen();
  } else {
    alert('Enter username and password');
  }
}

function checkAuth() {
      if (localStorage.getItem('authenticated') !== 'true') {
        window.location.href = 'login.html';
      }
}

function logout() {
  localStorage.removeItem('authenticated');
  window.location.href = 'login.html';
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  const section = document.getElementById(sectionId);
  if (section) section.style.display = 'block';
}

function renderHomeScreen() {
  const grid = document.getElementById("cardGrid");
  grid.innerHTML = "";
  systems.forEach(sys => {
    const card = document.createElement("div");
    card.className = "ate-card";
    card.onclick = () => goToMonitor(sys);
    card.innerHTML = `
      <h3>${sys.name}</h3>
      <p>Status: <span class="status" id="status-${sys.name}">Loading...</span></p>
      <button>View &rarr;</button>
    `;
    grid.appendChild(card);
  });
}

function goToMonitor(system) {
  selectedSystem = system;
  showSection('monitorScreen');
  document.getElementById("monitorTitle").innerText = `Monitoring: ${system.name}`;
  startFetching(system);
}

function goToHome() {
  clearInterval(imageInterval);
  clearInterval(statusInterval);
  showSection('home');
}

function getEndpoint(path) {
  return `http://${selectedSystem.ip}:8001/TSM_WebService/${path}`;
}

async function fetchAndUpdateImage() {
  try {
    const response = await fetch(getEndpoint("GetFP_Image"), {
      method: "POST",
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({})
    });
    const blob = await response.blob();
    const newUrl = URL.createObjectURL(blob);
    const img = document.getElementById("image");
    img.onload = () => {
      if (previousObjectUrl) URL.revokeObjectURL(previousObjectUrl);
      previousObjectUrl = newUrl;
    };
    img.src = newUrl;
  } catch (err) {
    console.error("Image fetch error:", err);
  }
}

async function pollStatus() {
  try {
    const response = await fetch(getEndpoint("GetTestStatus"), {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({})
    });
    const text = await response.text();
    const result = JSON.parse(text);
    const status = result.status || "Unknown";
    document.getElementById("status").innerText = status;
  } catch (err) {
    document.getElementById("status").innerText = "Error";
  }
}

function startFetching(system) {
  fetchAndUpdateImage();
  pollStatus();
  imageInterval = setInterval(fetchAndUpdateImage, 1000);
  statusInterval = setInterval(pollStatus, 2000);
}

renderHomeScreen();
