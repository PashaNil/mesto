export class Card {
  constructor(data, templateElement, handleCardClick, api, userInfo) {
    // data - likes[кто лайкнул], link, name, owner{инф о создателе}, id
    // api - Доступ к api.js
    // userInfo - конструктор userInfo, с сохраненной информацией обо мне.
    this._userInfo = userInfo;
    this._api = api;
    this._idСards = data._id // id карточек
    this._idUsers = data.owner._id; // id пользователей
    this._title = data.name; // имя карты
    this._link = data.link; // url карты
    this._likesCardArr = data.likes // Массивы лайков карточек [{пользователь 1},{пользователь 2}]
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
    this._elementLikeNumber = this._element.querySelector('.element__like-number');
    this._initTrash();
    this._initLikes()
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

  _removeCard() {
    this._api.deletCard(this._idСards)
      .then((data) => {
        this._element.remove();
        this._element = null;
        console.log(data.message)
      })
  };

  // Отображение корзины в карточке
  _initTrash() {
    this._buttonTrash = this._element.querySelector('.element__trash-button');
    if (this._idUsers === this._userInfo._info._id) {
      return this._buttonTrash
    } else {
      return this._buttonTrash.classList.add('element__trash-button_hiding');
    }
  }

  _toggleLike() {
    let promise
    if (this.isLiked()) {
      promise = this._api.deletLikeNumber(this._idСards)
    } else {
      promise = this._api.addLikeNumber(this._idСards)
    }

    promise.then((data) => {
      this._elementLikeNumber.textContent = data.likes.length;
      this._likesCardArr = data.likes
      this._buttonLike.classList.toggle("element__like-button_active");
    })
  }

  _initLikes() {
    if (this.isLiked()) {
      this._buttonLike.classList.toggle("element__like-button_active");
    }
    this._elementLikeNumber.textContent = this._likesCardArr.length;
  }

  isLiked() {
    return this._likesCardArr.find((likeInfo) => {
      return likeInfo._id === this._userInfo._info._id
    })
  }
};
