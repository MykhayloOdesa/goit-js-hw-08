// Завдання 3 - форма зворотного зв'язку
// HTML містить розмітку форми. Напиши скрипт,
// який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>

// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js.
// Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
// у яких зберігай поточні значення полів форми.Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.
// В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми,
// а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
// Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

// Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
import throttle from 'lodash.throttle';

const formData = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
formData.addEventListener('input', throttle(onInputForm, 500));
formData.addEventListener('submit', onSubmitForm);

// Виклик функції onReloadPage() при перезавантаженні сторінки
onReloadPage();

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
// у яких зберігай поточні значення полів форми.Нехай ключем для сховища буде рядок "feedback-form-state".
function onInputForm(event) {
  let inputStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  inputStorage = inputStorage ? JSON.parse(inputStorage) : {};
  inputStorage[event.target.name] = event.target.value;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inputStorage));
}

// Під час сабміту форми очищуй сховище і поля форми,
// а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
function onSubmitForm(event) {
  event.preventDefault();

  const userData = {};
  const formDataConsoled = new FormData(formData);

  formDataConsoled.forEach((value, name) => (userData[name] = value));
  console.log(userData);

  event.target.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.
// В іншому випадку поля повинні бути порожніми.
function onReloadPage(event) {
  let savedStorageValues = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedStorageValues) {
    savedStorageValues = JSON.parse(savedStorageValues);
    Object.entries(savedStorageValues).forEach(([name, value]) => {
      formData.elements[name].value = value;
    });
  }
}
