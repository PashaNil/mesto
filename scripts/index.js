const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Присваиваем и находим popup profile
const popupProfile = document.querySelector(".popup_type_profile");
// Присваиваем и находим кнопку редактирования
const popupBtnEdit = document.querySelector(".profile__edit-button");
// Присваиваем и находим кнопку закрытия
const popupBtnCloseProfile = document.querySelector(".popup__close-icon_type_profile");
//Присваиваем и находим форму с информацией profile
const popupFormProfile = document.querySelector(".popup__form_type_profile");
//Присваиваем и находим input имени
const inputName = document.querySelector(".popup__input_type_name");
//Присваиваем и находим input работы
const inputjob = document.querySelector(".popup__input_type_job");
//Присваиваем и находим заголовок в profile
const titleName = document.querySelector(".profile__title");
//Присваиваем и находим подзаголовок в profile
const subtitleJob = document.querySelector(".profile__subtitle");

// Присваеваем и находим popup figure
const popupFigure = document.querySelector(".popup_type_card-image");
// Присваеваем и находим кнопку закрытия figure
const popupBtnCloseFigure = document.querySelector(".popup__close-icon_type_card-image");
// Присваеваем и находим картинку figure
const cardFigureImg = document.querySelector(".popup__figure-img");
// Присваеваем и находим описание картинки figure
const cardFigureCaption = document.querySelector(".popup__figurecaption");

// Присваиваем и находим popup add-cards
const popupAddCards = document.querySelector(".popup_type_add-cards");
// Присваиваем и находим кнопку добавления карточек
const popupBtnAddCards = document.querySelector('.profile__add-button');
// Присваиваем и находим кнопку закрытия
const popupBtnCloseAddCards = document.querySelector(".popup__close-icon_type_add-cards");
// Присваиваем и находим форму add-cards
const popupFormAddCards = document.querySelector(".popup__form_type_add-cards");
// Присваиваем и находим input названия карточки
const inputCardTitle = document.querySelector(".popup__input_type_card-title");
// Присваиваем и находим input ссылки
const inputCardLink = document.querySelector(".popup__input_type_card-link");

// Присваиваем и находим tamplate
const templateElement = document.querySelector(".template-element").content.querySelector(".element");
// Присваиваем и находим секцию elements
const sectionElements = document.querySelector(".elements");

//Функция принимающая начальный массив для добавления карточек на сайт
function elementCard(arrayCard) {
  arrayCard.forEach((itemCard) => {
    creatCard(itemCard)
  })
}

// Функция принимающая элемент {} массива для добавления карточек на сайт
function creatCard(item) {
  const card = templateElement.cloneNode(true);
  card.querySelector(".element__title").textContent = item.name;
  card.querySelector(".element__mask-group").alt = item.name;
  card.querySelector(".element__mask-group").src = item.link;
  card.querySelector(".element__trash-button").addEventListener("click", () => {
    card.remove();
  })
  card.querySelector(".element__like-button").addEventListener("click", () => {
    card.querySelector(".element__like-button").classList.toggle("element__like-button_active");
  })
  card.querySelector(".element__mask-group").addEventListener("click", () => {
    openPopup(popupFigure)
    cardFigureImg.src = item.link;
    cardFigureImg.alt = item.name;
    cardFigureCaption.textContent = item.name;
  })
  sectionElements.prepend(card);
}

//Функция открытия всех попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}
//Функция закрытия всех попапов  нажатием крестика
function closePopup(popupCloseElement) {
  popupCloseElement.classList.remove("popup_opened");
}

//Слушатели на открытие попапов
popupBtnEdit.addEventListener('click', function () {
  openPopup(popupProfile);
  inputName.value = titleName.textContent;
  inputjob.value = subtitleJob.textContent;
});
popupBtnAddCards.addEventListener('click', function () {
  openPopup(popupAddCards);
});

// Слушатели на закрытие попапов крестиком
popupBtnCloseProfile.addEventListener("click", () => {
  closePopup(popupProfile)
});
popupBtnCloseAddCards.addEventListener("click", () => {
  closePopup(popupAddCards)
});
popupBtnCloseFigure.addEventListener("click", () => {
  closePopup(popupFigure);
})

// Слушатели на закрытия попапов вне попапа
popupProfile.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupProfile);
  }
})
popupAddCards.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupAddCards);
  }
})
popupFigure.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupFigure);
  }
})

//Слушатель активации формы profile
popupFormProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  titleName.textContent = inputName.value;
  subtitleJob.textContent = inputjob.value;
  closePopup(popupProfile);
});

// Слушатель активации формы addCard
popupFormAddCards.addEventListener("submit", (evt) => {
  evt.preventDefault();
  creatCard({ name: inputCardTitle.value, link: inputCardLink.value });
  closePopup(popupAddCards);
  inputCardTitle.value = "";
  inputCardLink.value = "";
})

// Вызов функции с передачей массива
elementCard(initialCards);
