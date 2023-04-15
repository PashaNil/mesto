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
  .catch((err) => {
    console.log(`Ошибка запроса ${err}`)
  })

// Функция принимающая каждый обьект карточки, генерирует возврщает изменения.
function createCard(cardData) {
  return new Card(cardData, constants.templateElement, handleCardClick, callbackLikeApi, newUserInfo, confirmationDeletCard).generateCard();
}

// Функция коллбек из Card
// Обрабатывает запросы на действие с лайком
function callbackLikeApi(answer, thisCard) {
    if (answer) {
      apiNew.deletLikeNumber(thisCard.idCard)
        .then((data) => {
          thisCard.removeLike(data)
        })
        .catch((err) => {
          console.log(`Ошибка запроса: ${err}`)
        })
    } else {
      apiNew.addLikeNumber(thisCard.idCard)
        .then((data) => {
          thisCard.setLike(data)
        })
        .catch((err) => {
          console.log(`Ошибка запроса: ${err}`)
        })
    }
}

// Функция открываяющая попап figure, принимающая с класса Card данные слушателя.
const popupWithImage = new PopupWithImage(".popup_type_card-image");

function handleCardClick(titleCard, linkImgCard) {
  popupWithImage.openPopup(titleCard, linkImgCard);
}

// Работа с формой addCard и отправка карточек на страницу.
const cardWithForm = new PopupWithForm(".popup_type_add-cards", (thisPopup, evt, values) => {
  thisPopup.setPendingSubmitterStatus(evt, "Сохранение...");
   apiNew.addNewCard(values)
    .then((data) => {
      cardList.addItem(createCard(data));
    })
    .catch((err) => {
      console.log(`Ошибка запроса ${err}`)
    })
    .finally(()=>{
      thisPopup.closePopup();
      thisPopup.setInitialSubmitterStatus(evt, "Создать");
    })
});

// Открытие попапа Card
// Слушатель кнопки страницы, открывает окно и сбрасывает валидацию.
constants.popupBtnAddCards.addEventListener('click', () => {
  cardWithForm.openPopup();
  formValidator["popupFormCards"].resetValidation();
})

// Попап Сonfirmation
// Колбек функция Card, которая вызывает попап подверждения и делает запрос api на удаление карточки.
function confirmationDeletCard(card) {
  const popupConfirmation = new PopupConfirmation(".popup_type_confirmation");
  popupConfirmation.setEventListeners();
  popupConfirmation.openPopup();
  popupConfirmation.onCloseCallback = function (submitChoice) { // true или false
    if (submitChoice) {
      apiNew.deletCard(card.idCard)
        .then((data) => { // При положительном ответе от сервера
          card.removeDOMElement()
          console.log(data.message)
        })
        .catch((err) => {
          console.log(`Ошибка запроса: ${err}`)
        })
    }
  }
}

// Данные пользователя
// Передаю попап, нахожу там инпуты, при сабмите выполняется отправка на сервер и обновление профайла
const infoWithForm = new PopupWithForm(".popup_type_profile", (thisPopup, evt, valuesInfo) => {
  thisPopup.setPendingSubmitterStatus(evt, "Сохранение...");
   apiNew.updateProfile(valuesInfo)
    .then((data) => {
      // Применяем изменения на странице
      //в ней {name, about, avatar, _id, cohort}
      newUserInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(`Ошибка запроса: ${err}`)
    })
    .finally(()=>{
      thisPopup.closePopup();
      thisPopup.setInitialSubmitterStatus(evt, "Сохранить")
    })
})

constants.popupBtnEdit.addEventListener('click', () => {
  infoWithForm.openPopup();
  const getUserInfo = newUserInfo.getUserInfo();
  constants.inputName.value = getUserInfo.nameTitleContent;
  constants.inputjob.value = getUserInfo.jobSubTitleContent;
  formValidator["popupFormProfile"].resetValidation();
})

// Обновление аватара
const avatarWithForm = new PopupWithForm(".popup_type_avatar-edit", (thisPopup, evt, valueAvatar) => {
  thisPopup.setPendingSubmitterStatus(evt, "Сохранение...");
  apiNew.updateAvatar(valueAvatar)
    .then((data) => {
      newUserInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(`Ошибка запроса: ${err}`)
    })
    .finally(()=>{
      thisPopup.closePopup();
      thisPopup.setInitialSubmitterStatus(evt, "Сохранить")
    })
})

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

// Danilov Pavel 2023
