export class Api {
  constructor(configApi){
    this._url = configApi.url
    this._headers = configApi.headers
  }

  // Получение карточек от сервера
  getInitialCards(){
    const url = this._url + "/cards"
    return fetch(url, {headers: this._headers})
    .then((res)=>{
      return res.json()
    })
  }

  // Создание новой карточки
  addNewCard(cardData){
    const url = this._url + "/cards";
     fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData)
    })
  }

  // Обновление данных профиля на сервере
  updateProfile(profileData){
    const url = this._url + "/users/me"
    fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(profileData)
    })
  }

  // (еще не реализовано)
  // Обновление данных лайка на сервере
  getLikeNumber(likesData){
    const url = this._url + "/cards"
    fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(likesData)
    })
  }

}
