import "core-js/actual";
import "./index.css";

import * as constants from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import { configForm } from "../utils/configForm.js";

import { Api } from "../components/Api.js";
import { apiConfig } from "../utils/apiConfig.js";

// Класс Api
const apiNew = new Api(apiConfig);

// Данные пользователя
const newUserInfo = new UserInfo({
  nameTitleSelector: ".profile__title",
  jobSubTitleSelector: ".profile__subtitle",
  avatarImgSelector: ".profile__avatar"
}
);

const cardList = new Section(
  {
    items: null,
    renderer: createCard
  },
  ".elements"
)

// Выгрузка всех карточек с сервера и выгрузка данных профиля
Promise.all([apiNew.getInitialCards(), apiNew.getSelfData()])
  .then(([cards, selfData]) => {
    newUserInfo.setUserInfo(selfData)
    cardList.renderItems(cards)
  })

// Функция принимающая каждый обьект карточки, генерирует возврщает изменения.
function createCard(cardData) {
  return new Card(cardData, constants.templateElement, handleCardClick, apiNew, newUserInfo).generateCard();
}

// Функция открываяющая попап figure, принимающая с класса Card данные слушателя.
const popupWithImage = new PopupWithImage(".popup_type_card-image");

function handleCardClick(titleCard, linkImgCard) {
  popupWithImage.openPopup(titleCard, linkImgCard);
}
popupWithImage.setEventListeners();

// Работа с формой addCard и отправка карточек на страницу.
const cardWithForm = new PopupWithForm(".popup_type_add-cards", (itemsCard) => {
  apiNew.addNewCard(itemsCard)
    .then((data) => {
      cardList.addItem(createCard(data));
    })
});
cardWithForm.setEventListeners();

// Открытие попапа Card
constants.popupBtnAddCards.addEventListener('click', () => {
  cardWithForm.openPopup();
  formValidator["popupFormCards"].resetValidation();
})

// Передаю попап, нахожу там инпуты, при сабмите выполняется отправка на сервер и обновление профайла
const infoWithForm = new PopupWithForm(".popup_type_profile", (itemsInfo) => {
  apiNew.updateProfile(itemsInfo)
  .then((data)=>{
    // Применяем изменения на странице
    //в ней {name, about, avatar, _id, cohort}
    newUserInfo.setUserInfo(data);
  })
})

infoWithForm.setEventListeners();

constants.popupBtnEdit.addEventListener('click', () => {
  infoWithForm.openPopup();
  const getUserInfo = newUserInfo.getUserInfo();
  constants.inputName.value = getUserInfo.nameTitleContent;
  constants.inputjob.value = getUserInfo.jobSubTitleContent;
  formValidator["popupFormProfile"].resetValidation();
})

// Обновление аватара
const avatarWithForm = new PopupWithForm(".popup_type_avatar-edit", (itemsAvatar)=>{
  apiNew.updateAvatar(itemsAvatar)
  .then((data)=>{
    newUserInfo.setUserInfo(data);
  })
})

avatarWithForm.setEventListeners();

constants.popupBtnAvatar.addEventListener('click', () => {
  formValidator["popupFormAvatar"].resetValidation();
  avatarWithForm.openPopup();
})

// Валидация
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

