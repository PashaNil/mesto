import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/initialCards.js";
import { configForm } from "../utils/configForm.js";

// Присваиваем и находим popup profile
const popupProfile = document.querySelector(".popup_type_profile");
// Присваиваем и находим кнопку редактирования
const popupBtnEdit = document.querySelector(".profile__edit-button");
//Присваиваем и находим заголовок в profile
const titleName = document.querySelector(".profile__title");
//Присваиваем и находим подзаголовок в profile
const subtitleJob = document.querySelector(".profile__subtitle");
//Присваиваем и находим input имени
const inputName = document.querySelector(".popup__input_type_name");
//Присваиваем и находим input работы
const inputjob = document.querySelector(".popup__input_type_job");

// Присваеваем и находим popup figure
const popupFigure = document.querySelector(".popup_type_card-image");

// Присваиваем и находим popup add-cards
const popupAddCards = document.querySelector(".popup_type_add-cards");
// Присваиваем и находим кнопку добавления карточек
const popupBtnAddCards = document.querySelector('.profile__add-button');

// Присваиваем и находим tamplate
const templateElement = document.querySelector(".template-element").content.querySelector(".element");
// Присваиваем и находим секцию elements для вставки template карточек
const cardsContainer = document.querySelector(".elements");

// Функция принимающая каждый обьект карточки, генерирует возврщает изменения.
function createCard(cardData) {
  const card = new Card(cardData, templateElement, handleCardClick).generateCard();
  return card;
}

// Вызов класса Section, принимабщая обьект с массивом готовых и отправленых карточек.
const cardList = new Section({
  items: initialCards, renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cardsContainer);
cardList.renderItems();

// Функция открываяющая попап figure, принимающая с класса Card данные слушателя.
const popupWithImage = new PopupWithImage(popupFigure);

function handleCardClick(titleCard, linkImgCard) {
  popupWithImage.openPopup(titleCard, linkImgCard);
  popupWithImage.setEventListeners();
}

// Работа с формой addCard и отправка карточек на страницу.
const cardWithForm = new PopupWithForm(popupAddCards, (itemsCard) => {
  cardList.addItem(createCard(itemsCard));
});
cardWithForm.setEventListeners();

popupBtnAddCards.addEventListener('click', () => {
  cardWithForm.openPopup();
  formValidator["popupFormCards"].resetValidation();
})

//Работа с формой profile
const newUserInfo = new UserInfo({ name: titleName, job: subtitleJob });

const infoWithForm = new PopupWithForm(popupProfile, (itemsInfo) => {
  newUserInfo.setUserInfo(itemsInfo);
})

infoWithForm.setEventListeners();

popupBtnEdit.addEventListener('click', () => {
  infoWithForm.openPopup();
  inputName.value = newUserInfo.getUserInfo().name
  inputjob.value = newUserInfo.getUserInfo().job
  formValidator["popupFormProfile"].resetValidation();
})


const formValidator = {};

// Функция создающая массив всех форм, переберает и отрпавляет в class FormValidator с вызовом активации.
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(configForm.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, configForm);
    validator.enableValidation();

    const formName = formElement.getAttribute("name");
    formValidator[formName] = validator;
  })
}


// Вызов функции активации валидации.
enableValidation();

