export class FormValidator {
  constructor(formElement, configForm) {
    this._formElement = formElement;
    this._configForm = configForm;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._configForm.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._configForm.submitButtonSelector);
  }

  // Метод переберающий массив полей, вызывающий на каждое поле слушатель на ввод.
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    })
  }

  // Функция состояния кнопки отправки.
  // Активирует ее, если массив полей проходит валидацию у hasInvalidInput и возращает true, и отключает если false.
  _toggleButtonState() {
    if (this._hasInvalidInput() === true) {
      this._buttonElement.classList.add(this._configForm.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._configForm.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled')
    }
  }

  // Метод переберает массив полей и возвращает значение, если valid поля имеет статус false.
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return inputElement.validity.valid === false;
    });
  }

  // Метод принимает поле, проверяет его валидность и вызывает методы статуса ошибки.
  _isValid(inputElement) {
    if (inputElement.validity.valid === true) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  // Метод принимающий поле, деактивирует отображение ошибки.
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._configForm.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._configForm.inputErrorClass);
  }

  // Метод принимающий поле, активирует отображение ошибки.
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._configForm.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._configForm.inputErrorClass);
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input)
    })
    this._toggleButtonState()
  }

  // Метод активации валидации. Теперь можно за квасом ♡.
  enableValidation() {
    this._setEventListeners();
  }
}
