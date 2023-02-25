// Функция при неправильной валидации.
// Находит span по id поля и добавляет класс ошибки. Добавляет класс ошибки полю.
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage; // span выводит ошибки полей по умлч.
  inputElement.classList.add(config.inputErrorClass);
}

// Функция при правильной валидации.
// Находит span по id поля и удаляет у него содержимое и класс. Удаляет класс ошибки у поля.
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}

// Функция проверяющая валидность поля и вызывающая функции статуса ошибки.
function isValid(formElement, inputElement, config) {
  if (inputElement.validity.valid === true) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

// Функция проверяет массив полей на валидность для кнопки, вернет false, если хоть один элемент ее не пройдет.
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return inputElement.validity.valid === false;
  });
};

// Функция состояния кнопки отправки.
// Активирует ее, если массив полей проходит валидацию у hasInvalidInput и возращает true, и отключает если false.
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList) === true) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
}

// Функция находящая все поля в принятой форме.
// Создает массив из всех полей ввода. Находим кнопку отправки.
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config); // Вызов функции состояния кнопки, когда поля еще не тронуты.

  // Перебераем поля и вызываем слушатель на ввод, в нем вызываем функцию состояния кнопки и функцию валидации поля.
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

// Функция создающая массив из всех форм. Принимает обьект с классами обьектов форм.
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))

  formList.forEach((formElement) => {
    setEventListeners(formElement, config)
  })
}
