let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

const inputForm = form.elements.email;

const textarea = form.elements.message;

const localeStorageKey = 'feedback-form-state';


if (localStorage.getItem(localeStorageKey)) {
  formData = JSON.parse(localStorage.getItem(localeStorageKey));
  inputForm.value = formData.email;
  textarea.value = formData.message;
}

form.addEventListener('input', handlerInput);
form.addEventListener('submit', handlerSubmit);


function handlerInput(evt) {
  const { email, message } = evt.currentTarget.elements;
  formData.email = email.value.trim();
  formData.message = message.value.trim();

  localStorage.setItem(localeStorageKey, JSON.stringify(formData));
}

function handlerSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;

  if (email.value.trim() === '' || message.value.trim() === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('actual Data:', formData);

  formData = {
    email: '',
    message: '',
  };

  localStorage.removeItem(localeStorageKey);

  form.reset();
}
