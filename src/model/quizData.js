import * as model from'./model.js';

export const getFormData = function(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    const data =  Object.fromEntries(formData.entries());
    Object.assign(model.formData, data);
    const stringifyFormData = JSON.stringify(data);
    console.log(stringifyFormData);
    localStorage.removeItem('formData');
  localStorage.setItem('formData',stringifyFormData);
  };