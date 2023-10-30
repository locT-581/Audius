const username = document.getElementById('username');
const password = document.getElementById('password');
const btnLogin = document.querySelector('.submit_btn');

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const user = {
    username: username.value,
    pass: password.value,
  };
  // Get data from localStorage
  let data = JSON.parse(localStorage.getItem('user'));
  if(!data) {
    alert("Bạn chưa có tài khoản, vui lòng đăng ký!");
    window.location.href = "signup.html";
  }
  if (data.username === user.username && data.pass === user.pass) {
    window.location.href = "index.html";
  } else {
    alert("Bạn đã nhập sai tên đăng nhập hoặc mật khẩu!");
  }  
});
