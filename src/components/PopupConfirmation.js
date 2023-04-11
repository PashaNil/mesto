import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this.formPopup = this._popupElement.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this.formPopup.addEventListener('submit', this.setEventSumbit.bind(this))
  }

  setEventSumbit(evt) {
    evt.preventDefault();
    this.closePopup();
    return true
  }
}
