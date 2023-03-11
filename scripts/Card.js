export class Card {
  constructor(data, templateElement, openPopupFugure) {
    this._name = data.name;
    this._link = data.link;
    this._templateElement = templateElement;
    this._openPopupFugure = openPopupFugure;
  }

  // Создет клон template и возвращает его.
  _getTemplate() {
    const cardElement = this._templateElement.cloneNode(true);
    return cardElement;
  }

  // Конструктор карточки, где присваиваются значения и возвращаются.
  generateCard() {
    this._element = this._getTemplate();
    this._elementMask = this._element.querySelector('.element__mask-group');
    this._elementMask.src = this._link;
    this._elementMask.alt = this._name;

    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  // Вызов слушателей для элементов карточки.
  _setEventListeners() {
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._deletingCard();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', this._activationLikeButton);

    // Слушатель на нажатие по картинке, отправляет данные внешней функции активации popupfigure.
    this._elementMask.addEventListener('click', () => {
      this._openPopupFugure(this._name, this._link);
    })
  }

  _deletingCard(){
    this._element.remove();
    this._element = null;
  };

  _activationLikeButton(evt){
    evt.target.classList.toggle("element__like-button_active")
  }

};
