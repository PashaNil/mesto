import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this.figureImg = this._popupElement.querySelector(".popup__figure-img");
    this.figureCaption = this._popupElement.querySelector(".popup__figurecaption");
  }

  openPopup(titleCard, linkImgCard){
    super.openPopup();
    this.figureImg.src = linkImgCard;
    this.figureImg.alt = titleCard;
    this.figureCaption.textContent = titleCard;
  }
}
