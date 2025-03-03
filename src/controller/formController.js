import * as quiz from "../model/quizData.js";
import { getPdfData } from "../utils/pdfData.js";
import { generateQuestions } from "../utils/aiFunction.js";
import * as model from "../model/model.js";

let formEle = document.querySelector("#container");
const submitBtn = document.querySelector('#submit');
formEle.addEventListener("submit", quiz.getFormData);
formEle.addEventListener("submit",function(){
  console.log(submitBtn);
  submitBtn.classList.toggle('active');
})

formEle.addEventListener("submit", async function (e) {
e.preventDefault();
  if (model.formData.topic) {
    await generateQuestions(`give ${model.formData.numberOfquestions} 
  mcq ${model.formData.level} questions from ${model.formData.topic} in json format which must contain options in a,b,c,d and unique question id with answer as alphabates`);

  } else if (model.pdfText.text) {
    await generateQuestions(`give ${model.formData.numberOfquestions} 
      mcq ${model.formData.level} questions from this text ${model.pdfText.text} in json format which must contain options in a,b,c,d and unique question id with answer as alphabates`);
  }else{
    window.alert("Enter a topic! OR add a pdf");
    submitBtn.classList.toggle('active');
   
  }
});

document.getElementById("pdfInput").addEventListener("change", getPdfData);
