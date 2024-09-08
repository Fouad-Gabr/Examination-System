import ExamScreen from "./ExamScreen.js";
import LogInScreen from "./LoginScreen.js";
import SignUpScreen from "./SignupScreen.js";
export default class Exam{
constructor(){
  
}
 pickImage() {
    let file = document.getElementById("file");
    file.click();
    file.addEventListener("change", () => {
      let pick_label = document.getElementById("picture-label");
      pick_label.innerText = file.files[0].name;
      const fr = new FileReader();
      fr.readAsDataURL(file.files[0]);
      fr.addEventListener("load", () => {
        const url = fr.result;
        sessionStorage.setItem("file", url);
        sessionStorage.setItem("file-name", file.files[0].name);
      });
    });
  }
 createSingupScreen(){
    return new SignUpScreen();
}
createLogInScreen(){
    return new LogInScreen();
}
createExamScreen(){
    return new ExamScreen();
}
}
