function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username && password) {
    localStorage.setItem('authenticated', 'true');
    window.location.href = 'index.html';
  } else {
    alert('Please enter username and password');
  }
}