import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this.formPopup = this._popupElement.querySelector('.popup__form');
    this.popupEventSumbit = this.popupEventSumbit.bind(this);
    this.onCloseCallback = null;
  }

  setEventListeners() {
    this.formPopup.addEventListener('submit', this.popupEventSumbit);
  }

  popupEventSumbit(evt) {
    evt.preventDefault();
    /*     this._processingChoice({ submit: true }) */
    this.onCloseCallback({ submit: true })
  }

  /*   _processingChoice({ submit = false } = {}) {
      if (this.onCloseCallback) {
        this.onCloseCallback(submit)
      }
    } */

  closePopup() {
    super.closePopup();
    this.formPopup.removeEventListener('submit', this.popupEventSumbit);
  }


}
