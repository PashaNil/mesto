import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitForm){
    super(popupSelector);
    this.submitForm = submitForm;
    this.formPopup = this._popupElement.querySelector('.popup__form');
    this.inputsForm = this._popupElement.querySelectorAll('.popup__input');
  }

  _getInputValues(){
    this.inputValues = {};
    this.inputsForm.forEach((item) => {
      this.inputValues[item.name] = item.value;
    })
    return this.inputValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this.formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitForm(this._getInputValues());
      this.closePopup();
    })
  }

  closePopup(){
    super.closePopup();
    this.formPopup.reset();
  }
}
