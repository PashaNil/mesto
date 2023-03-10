import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import { configForm } from "./configForm.js";

// Присваиваем и находим все кнопки крестика закрытия попапов на странице
const closeButtons = document.querySelectorAll(".popup__close-icon")
// Присваиваем и находим все попыпы на странице
const popups = document.querySelectorAll(".popup");

// Присваиваем и находим popup profile
const popupProfile = document.querySelector(".popup_type_profile");
// Присваиваем и находим кнопку редактирования
const popupBtnEdit = document.querySelector(".profile__edit-button");
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
// Присваеваем и находим картинку figure
const cardFigureImg = document.querySelector(".popup__figure-img");
// Присваеваем и находим описание картинки figure
const cardFigureCaption = document.querySelector(".popup__figurecaption");

// Присваиваем и находим popup add-cards
const popupAddCards = document.querySelector(".popup_type_add-cards");
// Присваиваем и находим кнопку добавления карточек
const popupBtnAddCards = document.querySelector('.profile__add-button');
// Присваиваем и находим форму add-cards
const popupFormAddCards = document.querySelector(".popup__form_type_add-cards");
// Присваиваем и находим input названия карточки
const inputCardTitle = document.querySelector(".popup__input_type_card-title");
// Присваиваем и находим input ссылки
const inputCardLink = document.querySelector(".popup__input_type_card-link");

// Присваиваем и находим tamplate
const templateElement = document.querySelector(".template-element").content.querySelector(".element");
// Присваиваем и находим секцию elements для вставки
const sectionElements = document.querySelector(".elements");

//Функция принимающая массив карточек, переберая его передает в виде обьектов в creatCard.
function renderCards(arrayCard) {
  arrayCard.forEach(createCard)
}

// Функция принимающая каждый обьект карточки, отправляет его в класс Card и добавляет на страницу.
function createCard(item) {
  const card = new Card(item, templateElement, openPopupFugure).generateCard();
  sectionElements.prepend(card);
}

// Функция открываяющая попап figure, принимающая с класса Card данные слушателя.
function openPopupFugure(name, link) {
  openPopup(popupFigure)
  cardFigureImg.src = link;
  cardFigureImg.alt = name;
  cardFigureCaption.textContent = name;
}

// Функция открытия всех попапов со слушателем нажатия кнопки
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener("keydown", keydownEsc)
}

// Функция закрытия всех попапов с удалением слушателя
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", keydownEsc)
}

// Перебор псевдомассива с попапами страницы, добавляющая в них слушатель
// В слушателях проверка: если в кликнутом обьекте есть указанный класс, то вызывается функция закрытия с переданным попапом.
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup)
    }
  })
})

// Функция закрытие попапа по нажатию esc
function keydownEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened")
    closePopup(popup)
  }
}

// Слушатель на открытие popupProfile
popupBtnEdit.addEventListener('click', function (evt) {
  openPopup(popupProfile);
  inputName.value = titleName.textContent;
  inputjob.value = subtitleJob.textContent;
});
// Слушатель на открытие popupAddCards.
popupBtnAddCards.addEventListener('click', function () {
  openPopup(popupAddCards);
});

// Слушатель отправки формы profile
popupFormProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  titleName.textContent = inputName.value;
  subtitleJob.textContent = inputjob.value;
  closePopup(popupProfile);
});

// Слушатель отправки формы addCard
popupFormAddCards.addEventListener("submit", (evt) => {
  evt.preventDefault();
  createCard({ name: inputCardTitle.value, link: inputCardLink.value });
  closePopup(popupAddCards);
  evt.target.reset(); // Сбрасывает поля формы после отправки.
  const formValidator = new FormValidator(evt.target, configForm).enableValidation();
})

// Функция создающая массив всех форм, переберает и отрпавляет в class FormValidator с вызовом активации.
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(configForm.formSelector))
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, configForm).enableValidation();
  })
}

// Вызов функции активации валидации.
enableValidation();

// Вызов функции принимающая массив с готовыми картами.
renderCards(initialCards);

