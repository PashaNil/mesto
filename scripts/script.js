// Присваиваем и находим popup
const popupProfile = document.querySelector(".popup");
// Присваиваем и находим кнопку редактирования
const popupBtnEdit = document.querySelector(".profile__edit-button");
// Присваиваем и находим кнопку закрытия
const popupBtnCloseProfile = document.querySelector(".popup__close-icon");
//Присваиваем и находим форму с информацией
const popupForm = document.querySelector(".popup__form");
//Присваиваем и находим форму имени
const inputName = document.querySelector("#name");
//Присваиваем и находим форму работы
const inputjob = document.querySelector("#job");
//Присваиваем и находим кнопку отправки формы
const btnSaveForm = document.querySelector(".popup__button-save");

//Открытие попапа редактирования профиля
function openPopupProfile() {
  popupProfile.classList.add("popup_opened");
  //Присваиваем формам значения заголовка и текста
  inputName.value = document.querySelector(".profile__title").textContent;
  inputjob.value = document.querySelector(".profile__subtitle").textContent;
}
//Закрывает попап при нажатии крестика
function closePopupProfile() {
  popupProfile.classList.remove("popup_opened");
}
//Сохраняет значения в заголовок и текст и закрывает попап
function setForm(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = inputName.value;
  document.querySelector(".profile__subtitle").textContent = inputjob.value;
  closePopupProfile();
}

//Слушатель на кнопку открытия попапа
popupBtnEdit.addEventListener("click", openPopupProfile);
//Слушатель на кнопку закрытия попапа по крестику
popupBtnCloseProfile.addEventListener("click", closePopupProfile);
//Слушатель и функция закрытия попапа профиля нажатием вне попапа
popupProfile.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopupProfile();
  }
})
//Слушатель на кнопку сохранения попапа
btnSaveForm.addEventListener("click", setForm);
