export class Api {
  constructor(configApi){
    this._url = configApi.url
    this._headers = configApi.headers
  }

  getCards(){
    const url = this._url + "/cards"
    return fetch(url, {headers: this._headers})
    .then((res)=>{
      return res.json()
    })
  }
}
