export default  class LogInScreen{
    constructor(){
    
    }
    goWelcomePage() {
      let val1=(this.logInValidate());
      console.log(val1);
      if (val1) {
        location.href = "../welcome-page/welcome.html";
      }
    }
    
     logInValidate() {
      let username = document.getElementById("username");
      let password = document.getElementById("password");
      let userErr = document.getElementById("usernameErr");
      let passErr = document.getElementById("passwordErr");
      let logBtn = document.getElementById("loginBtn");
    
      let f1 = false;
      let f2 = false;
    
      if (username.value.length == 0) {
        userErr.style.display = "block";
        userErr.innerHTML = `&#9888;Please enter your username`;
      } else if (!(username.value == sessionStorage.getItem("email"))) {
        userErr.style.display = "block";
        userErr.innerHTML = `&#9888;an incorrect username`;
      } else {
        f1 = true;
      }
    
      if (password.value.length == 0) {
        passErr.style.display = "block";
        passErr.innerHTML = `&#9888;Please enter your password`;
      } else if (!(password.value == sessionStorage.getItem("password"))) {
        passErr.style.display = "block";
        passErr.innerHTML = `&#9888;an incorrect password`;
      } else {
        f2 = true;
      }
    
      if (f1) {
        userErr.innerHTML = "";
      }
    
      if (f2) {
        passErr.innerHTML = "";
      }
    
      if (f1 && f2) {
        logBtn.style.backgroundColor = "green";
      }
    
      return f1 && f2;
    }
    }
    
    