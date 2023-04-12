import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this.formPopup = this._popupElement.querySelector('.popup__form');
  }

setEventSumbit() {
  return new Promise((resolve,reject)=>{

      this.formPopup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.closePopup()
        resolve(true)
        });

    })
  }


}
