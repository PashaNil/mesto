export class Api {
  constructor(configApi) {
    this._url = configApi.url
    this._headers = configApi.headers
  }

  _request(url, data = {}) {
    return fetch(url, {
      ...data,
      headers: this._headers
    })
      .then((res) => {
        return res.json()
      })
  }

  // Получение карточек от сервера
  getInitialCards() {
    const url = this._url + "/cards"
    return this._request(url)
  }

  // Получение информации о себе
  initialMe() {
    const url = this._url + "/users/me";
    return this._request(url)
  }

  // Создание новой карточки
  addNewCard(cardData) {
    const url = this._url + "/cards";
    return this._request(url, {
      method: "POST",
      body: JSON.stringify(cardData)
    })
  }

  // Обновление данных профиля на сервере
  updateProfile(profileData) {
    const url = this._url + "/users/me"
    return this._request(url, {
      method: "PATCH",
      body: JSON.stringify(profileData)
    })
  }

  // (еще не реализовано)
  // Обновление данных лайка на сервере
  getLikeNumber(cardId) {
    const url = this._url + `/cards/${cardId}/likes`
    return this._request(url, {
      method: "PUT"
    })
  }

  // Удаление лайка
  deletLikeNumber(cardId) {
    const url = this._url + `/cards/${cardId}/likes`
    return this._request(url, {
      method: "DELETE"
    })
  }

}