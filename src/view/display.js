import * as model from '../model/model.js'


export const displayQuestion = function(quizQuestions,index=0,submitted=false){
  console.log(quizQuestions);
  const HTMLCode = `<div class="questions">
      <p class="question">${index+1}.
      ${quizQuestions[index]?.question}
      </p>
      <div class="options">
      <input type="radio" name="option" value="a" ${submitted&&'disabled'}  ${quizQuestions[index]?.checkOption =='a'?'checked ':''}> <label for='a' ${'a' ===quizQuestions[index]?.answer && submitted ?'class="correct"':''}> a. ${quizQuestions[index]?.options.a}</label></br>
      <input type="radio" name="option" value="b" ${submitted&&'disabled'} ${quizQuestions[index]?.checkOption =='b'?'checked':''}> <label for='b' ${'b' ===quizQuestions[index]?.answer && submitted ?'class="correct"':''} > b. ${quizQuestions[index]?.options.b}</label></br>
      <input type="radio" name="option" value="c" ${submitted&&'disabled'}  ${quizQuestions[index]?.checkOption =='c'?'checked':''}> <label for='c' ${'c' ===quizQuestions[index]?.answer && submitted?'class="correct" ':''}> c. ${quizQuestions[index]?.options.c}</label></br>
      <input type="radio" name="option" value="d" ${submitted&&'disabled'} ${quizQuestions[index]?.checkOption =='d'?'checked':''}> <label for='d'  ${'d' ===quizQuestions[index]?.answer && submitted?'class="correct"':''}> d. ${quizQuestions[index]?.options.d}</label></br>
      </div>
    </div>
  `;
 console.log(quizQuestions);
 if(!quizQuestions[index])return;
    return [HTMLCode,+quizQuestions[index]?.id];
}
export const displayOptions= function(){

}
export const showNumbers = function(numberOfQuestions,questions,submitted=false){
  let allHtmlCode='';
  for(let i=1;i<=numberOfQuestions;i++){
    console.log(questions[i-1].checkOption,questions[i-1].answer);
   allHtmlCode+=`<span ${submitted&& (questions[i-1].answer===questions[i-1].checkOption?'class="correct"':'class="wrong"')}>${i}</span>`
  }
  return allHtmlCode;
  
}

export const result = function(questions){
  let correct=0;
  questions.forEach(qs=>{
    if(qs.answer===qs.checkOption){
      correct++;
    }
  });
  const HTMLcode = `<div class="result"<h1>Result:  ${correct}/${questions.length}</h1></br>
   <a href="/index.html"><button>New Test</button></a>
    <a href="/test.html"><button>Retry</button></a>

  </div>`;
return HTMLcode;
}
