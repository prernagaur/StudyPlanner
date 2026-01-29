document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  const userid = document.getElementById('userid').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!userid || !password) {
    alert('Please enter both userid and password.');
    return;
  }

  // Mock users database (userid: password)
  const users = {
    'harsh': 'harsh123',
    'rajan': 'rajan123',
    'user3': 'secret321'
  };

  if (users[userid] && users[userid] === password) {
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid userid or password. Please try again.');
  }
});
