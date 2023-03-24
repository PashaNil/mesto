export default class UserInfo {
  constructor({name, job}){
    this._nameTitle = name;
    this._jobSubtitle = job;
  }

  getUserInfo(){
    return {
      name: this._nameTitle.textContent,
      job: this._jobSubtitle.textContent
    }
  }

  setUserInfo({name, job}){
    this._nameTitle.textContent = name;
    this._jobSubtitle.textContent = job;
  }
}
