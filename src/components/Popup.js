export default class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeOverlayCross = this._closeOverlayCross.bind(this);
  }
  // Добавляет класс открытия и слушатель на нажатие клавиши.
  openPopup(){
    this._popupElement.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose)
    this._popupElement.addEventListener("mousedown", this._closeOverlayCross)
  }
  // Удаляет класс открытия и слушатель на нажатие клавиши.
  closePopup(){
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("mousedown", this._closeOverlayCross)
  }
  // Механизм слушателя нажатия клавиши в попапах.
  _handleEscClose(evt){
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  _closeOverlayCross(evt){
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains('popup__close-icon')) {
      this.closePopup();
    }
  }

  // Слушатель попапа на нажатие по крестики или оверлею.
/*   setEventListeners(){
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains('popup__close-icon')) {
        this.closePopup();
      }
    })
  } */
}
