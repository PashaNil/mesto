import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, submitForm){
    super(popupSelector)
    this.submitForm = submitForm;
    this.formPopup = this._popupElement.querySelector('.popup__form');
  }

  setEventListeners(){
    super.setEventListeners();
    this.formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.closePopup();
    })
  }
}
