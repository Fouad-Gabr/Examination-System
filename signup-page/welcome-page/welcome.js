import Exam from "../../javascript_exam/Exam.js";
window.obj1=new Exam();
window.obj1=window.obj1.createExamScreen()
let set1=setInterval(()=>{
    try{
        window.obj1.startVideoRecord(()=>{},()=>{});
        clearInterval(set1);
        console.log("kkkkkk123ff");
    }
    catch(e){
        console.log(e);
        
    }
},1)



