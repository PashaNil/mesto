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
    this.closePopup({ submit: true })
  }

  closePopup({ submit = false } = {}) {
    if (this.onCloseCallback) {
      this.onCloseCallback(submit)
    }
    this.formPopup.removeEventListener('submit', this.popupEventSumbit);
    super.closePopup();
  }



}
