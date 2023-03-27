export default class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  // Добавляет класс открытия и слушатель на нажатие клавиши.
  openPopup(){
    this._popupElement.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose)
  }
  // Удаляет класс открытия и слушатель на нажатие клавиши.
  closePopup(){
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  // Механизм слушателя нажатия клавиши в попапах.
  _handleEscClose(evt){
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }
  // Слушатель попапа на нажатие по крестики или оверлею.
  setEventListeners(){
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains('popup__close-icon')) {
        this.closePopup();
      }
    })
  }
}
