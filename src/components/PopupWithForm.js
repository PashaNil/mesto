import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, onSubmitFormCallback) {
    super(popupSelector);
    this.onSubmitFormCallback = onSubmitFormCallback;
    this.formPopup = this._popupElement.querySelector('.popup__form');
    this.inputsForm = this._popupElement.querySelectorAll('.popup__input');
    this._processingSubmitEvent = this._processingSubmitEvent.bind(this);
  }

  _getInputValues() {
    this.inputValues = {};
    this.inputsForm.forEach((item) => {
      this.inputValues[item.name] = item.value;
    })
    return this.inputValues;
  }

  _processingSubmitEvent(evt) {
    evt.preventDefault();
    this.onSubmitFormCallback(this, evt, this._getInputValues())
  }

  openPopup() {
    super.openPopup();
    this.formPopup.addEventListener('submit', this._processingSubmitEvent);
  }

  closePopup() {
    super.closePopup();
    this.formPopup.removeEventListener('submit', this._processingSubmitEvent);
    this.formPopup.reset();
  }
}
