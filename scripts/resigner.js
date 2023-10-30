const username = document.getElementById('username');
const password = document.getElementById('password');
const prepassword = document.getElementById('prepassword');
const form = document.getElementById('form');

let isValid=false;
let pswdcheck=false;

function validateForm() {
    isValid = form.checkValidity();
    if(prepassword.value===password.value &&prepassword.value!=='' && password.value!=''){
        pswdcheck=true;
        password.style.borderColor='green';
        prepassword.style.borderColor='green';
    }else{
        pswdcheck=false;
        password.style.borderColor='red';
        prepassword.style.borderColor='red';
        alert("Mật khẩu phải giống nhau")
    }
    if(isValid && pswdcheck){
        alert("Đăng ký thành công");
        window.location.href= "login.html";
    }
}

function storeFormData() {
    const user = {
      username: username.value,
      pass: password.value,
      premium: false,
      namePremium: '',
    };
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
  }
  
  function processFormData(e) {
    e.preventDefault();
    validateForm();
    if (isValid && pswdcheck) storeFormData();
  }
  
  form.addEventListener('submit', processFormData);