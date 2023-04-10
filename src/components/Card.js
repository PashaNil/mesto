export class Card {
  constructor(data, templateElement, handleCardClick, api) {
    this._api = api;
    this._title = data.name;
    this._link = data.link;
    this._likesNumber = data.likes
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;
    this._removeCard = this._removeCard.bind(this);
    this._toggleLike = this._toggleLike.bind(this);
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
    this._elementMask.alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._buttonTrash = this._element.querySelector('.element__trash-button');
    this._elementLikeNumber = this._element.querySelector('.element__like-number');
    this._elementLikeNumber.textContent = this._likesNumber.length;

    this._setEventListeners();
    return this._element;
  }

  // Вызов слушателей для элементов карточки.
  _setEventListeners() {
    this._buttonTrash.addEventListener('click', this._removeCard);
    this._buttonLike.addEventListener('click', this._toggleLike);

    // Слушатель на нажатие по картинке, отправляет данные внешней функции активации popupfigure.
    this._elementMask.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    })
  }

  _removeCard(){
    this._element.remove();
    this._element = null;
  };

  _toggleLike(){
    debugger
    this._buttonLike.classList.toggle("element__like-button_active");
  }

};
