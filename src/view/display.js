import * as model from '../model/model.js'


export const displayQuestion = function(quizQuestions,index=0){
  console.log(quizQuestions);
  const HTMLCode = `<div class="questions">
      <p class="question">${index+1}.
      ${quizQuestions[index].question}
      </p>
      <input type="radio" name="option" value="a"> <label for='a'> a. ${quizQuestions[index].options.a}</label></br>
      <input type="radio" name="option" value="b"> <label for='b'> b. ${quizQuestions[index].options.b}</label></br>
      <input type="radio" name="option" value="c"> <label for='c'> c. ${quizQuestions[index].options.c}</label></br>
      <input type="radio" name="option" value="d"> <label for='d'> d. ${quizQuestions[index].options.c}</label></br>
    </div>
        <button >Previous</button>
  <button type='submit'>Save/next</button>`;
 console.log(quizQuestions);
    return [HTMLCode,+quizQuestions[index].id];
}
export const displayOptions= function(){

}
export const showNumbers = function(numberOfQuestions){
  let allHtmlCode='';
  for(let i=1;i<=numberOfQuestions;i++){
   allHtmlCode+=`<span>${i}</span>`
  }
  return allHtmlCode;
  
}