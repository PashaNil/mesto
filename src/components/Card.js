export class Card {
  constructor(data, templateElement, handleCardClick, callbackLikeApi, userInfo, confirmationDeletCard) {
    // data - likes[кто лайкнул], link, name, owner{инф о создателе}, id
    // userInfo - конструктор userInfo, с сохраненной информацией обо мне.
    this._userInfo = userInfo;
    this.callbackLikeApi = callbackLikeApi;
    this.idCard = data._id // id карточки
    this._idOwnerCard = data.owner._id; // id владельца карточки
    this.titleCard = data.name; // Заголовок карточки
    this.linkCard = data.link; // url карточки
    this._likesCardArr = data.likes // Массив лайкнувших карточку, с обьектами [{пользователь 1},{пользователь 2}]
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;
    this.confirmationDeletCard = confirmationDeletCard;
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
    this._elementMask.src = this.linkCard;
    this._elementMask.alt = this.titleCard;
    this._element.querySelector('.element__title').textContent = this.titleCard;
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._elementLikeNumber = this._element.querySelector('.element__like-number');
    this._initTrash(); // Возвращает элемент корзины.
    this._initLikes(); // Вызывает проверку на мой лайк и добавляет счетчик лайков.
    this._setEventListeners();
    return this._element;
  }

  // Вызов слушателей для элементов карточки.
  _setEventListeners() {
    this._buttonTrash.addEventListener('click', this._removeCard);
    this._buttonLike.addEventListener('click', this._toggleLike);

    // Слушатель на нажатие по картинке, отправляет данные внешней функции активации popupfigure.
    this._elementMask.addEventListener('click', () => {
      this._handleCardClick(this.titleCard, this.linkCard);
    })
  }

  // Удаление карточки,
  _removeCard() {
    this.confirmationDeletCard(this) // Вызов внешней функции с попапом подтверждения
  };

  removeDOMElement(){
    this._element.remove();
    this._element = null;
  }

  // Отображение корзины в карточке
  // Если id создателя карточки равно моему, то элем корзины, если нет, то возвращает ее невидимой.
  _initTrash() {
    this._buttonTrash = this._element.querySelector('.element__trash-button');
    if (this._idOwnerCard === this._userInfo._info._id) {
      return this._buttonTrash
    } else {
      return this._buttonTrash.classList.add('element__trash-button_hiding');
    }
  }

  // Вызывается при нажатии лайка.
  // Вызывает колбек функцию, _isLiked проверяет лайк.
  _toggleLike() {
    this.callbackLikeApi(this._isLiked(), this)
  }

  removeLike(data){
    this._elementLikeNumber.textContent = data.likes.length;
    this._likesCardArr = data.likes
    this._buttonLike.classList.toggle("element__like-button_active");
  }

  setLike(data){
    this._elementLikeNumber.textContent = data.likes.length;
    this._likesCardArr = data.likes
    this._buttonLike.classList.toggle("element__like-button_active");
  }

  // Если _isLiked вернет значение, то добавит активный лайк.
  // В любом случае счетчику лайков задаст количество строк в массиве likesCardArr.
  _initLikes() {
    if (this._isLiked()) {
      this._buttonLike.classList.toggle("element__like-button_active");
    }
    this._elementLikeNumber.textContent = this._likesCardArr.length;
  }

  // Переберает массив с лайкнувшими карточку
  // Если в карточке есть совпадения с моим id, то вернет значение.
  _isLiked() {
    return this._likesCardArr.find((likeInfo) => {
      return likeInfo._id === this._userInfo._info._id
    })
  }
};
