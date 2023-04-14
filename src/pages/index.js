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
// Обрабатывает запросы на действие с лайком и возвращает промис с ответом.
function callbackLikeApi(answer, idСards) {
  return new Promise((resolve, reject) => {
    if (answer) {
      apiNew.deletLikeNumber(idСards)
        .then((data) => {
          return resolve(data)
        })
        .catch((err) => {
          console.log(`Ошибка запроса: ${err}`)
          return reject()
        })
    } else {
      apiNew.addLikeNumber(idСards)
        .then((data) => {
          return resolve(data)
        })
        .catch((err) => {
          console.log(`Ошибка запроса: ${err}`)
          return reject()
        })
    }
  })
}

// Функция открываяющая попап figure, принимающая с класса Card данные слушателя.
const popupWithImage = new PopupWithImage(".popup_type_card-image");

function handleCardClick(titleCard, linkImgCard) {
  popupWithImage.openPopup(titleCard, linkImgCard);
}

// Работа с формой addCard и отправка карточек на страницу.
const cardWithForm = new PopupWithForm(".popup_type_add-cards", (itemsCard) => {
  return apiNew.addNewCard(itemsCard)
    .then((data) => {
      cardList.addItem(createCard(data));
    })
    .catch((err) => {
      console.log(`Ошибка запроса ${err}`)
    })
});

// Открытие попапа Card
// Слушатель кнопки страницы, открывает окно и сбрасывает валидацию.
constants.popupBtnAddCards.addEventListener('click', () => {
  cardWithForm.openPopup();
  formValidator["popupFormCards"].resetValidation();
})

// Попап Сonfirmation
// Колбек функция Card, которая вызывает попап подверждения и возвращает промис с результатом ответа от сервера.
function confirmationDeletCard(idCard) {
  return new Promise((resolve, reject) => {
    const popupConfirmation = new PopupConfirmation(".popup_type_confirmation");
    popupConfirmation.setEventListeners();
    popupConfirmation.openPopup();
    popupConfirmation.onCloseCallback = function (submitChoice) { // true или false
      if (submitChoice) {
        apiNew.deletCard(idCard)
          .then((data) => {
            console.log(data.message)
            return resolve()
          })
          .catch((err) => {
            console.log(`Ошибка запроса: ${err}`)
            return reject()
          })
      }
    }
  })
}

// Данные пользователя
// Передаю попап, нахожу там инпуты, при сабмите выполняется отправка на сервер и обновление профайла
const infoWithForm = new PopupWithForm(".popup_type_profile", (itemsInfo) => {
  return apiNew.updateProfile(itemsInfo)
    .then((data) => {
      // Применяем изменения на странице
      //в ней {name, about, avatar, _id, cohort}
      newUserInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(`Ошибка запроса: ${err}`)
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
const avatarWithForm = new PopupWithForm(".popup_type_avatar-edit", (itemsAvatar) => {
  return apiNew.updateAvatar(itemsAvatar)
    .then((data) => {
      newUserInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(`Ошибка запроса: ${err}`)
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
