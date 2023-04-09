import "core-js/actual";
import "./index.css";

import * as constants from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/initialCards.js";
import { configForm } from "../utils/configForm.js";

import { Api } from "../components/api.js";
import { apiConfig } from "../utils/apiConfig.js";

// Функция принимающая каждый обьект карточки, генерирует возврщает изменения.
function createCard(cardData) {
  const card = new Card(cardData, constants.templateElement, handleCardClick).generateCard();
  return card;
}

// Вызов класса Section, принимабщая обьект с массивом готовых и отправленых карточек.
/* const cardList = new Section({
  items: initialCards, renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, ".elements");
cardList.renderItems(); */

// Логика добавления карточек с сервера
const apiNew = new Api(apiConfig);
let blabla = null;
apiNew.getCards().then((data)=>{blabla = data})
console.log(blabla)

/* const cardListApi = new Section({
  items: apiNew.getCards().then(data), renderer: (item) => {
    cardListApi.addItem(createCard(item));
  }
}, ".elements");
cardListApi.renderItems(); */

// Функция открываяющая попап figure, принимающая с класса Card данные слушателя.
const popupWithImage = new PopupWithImage(".popup_type_card-image");

function handleCardClick(titleCard, linkImgCard) {
  popupWithImage.openPopup(titleCard, linkImgCard);
}
popupWithImage.setEventListeners();

// Работа с формой addCard и отправка карточек на страницу.
const cardWithForm = new PopupWithForm(".popup_type_add-cards", (itemsCard) => {
  cardList.addItem(createCard(itemsCard));
});
cardWithForm.setEventListeners();

constants.popupBtnAddCards.addEventListener('click', () => {
  cardWithForm.openPopup();
  formValidator["popupFormCards"].resetValidation();
})

//Работа с формой profile
const newUserInfo = new UserInfo({ nameTitleSelector: ".profile__title", jobSubTitleSelector: ".profile__subtitle" });

const infoWithForm = new PopupWithForm(".popup_type_profile", (itemsInfo) => {
  newUserInfo.setUserInfo(itemsInfo);
})

infoWithForm.setEventListeners();

constants.popupBtnEdit.addEventListener('click', () => {
  infoWithForm.openPopup();
  const getUserInfo = newUserInfo.getUserInfo();
  constants.inputName.value = getUserInfo.nameTitleContent;
  constants.inputjob.value = getUserInfo.jobSubTitleContent;
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

