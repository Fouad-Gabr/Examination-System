import ExamScreen from "./ExamScreen.js" ;
import LogInScreen from "./LoginScreen.js" ;
import SignUpScreen from "./SignupScreen.js" ;
export default class Exam{
constructor(){
  
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
