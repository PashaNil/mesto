export default class UserInfo {
  constructor({nameTitleSelector, jobSubTitleSelector}){
    this._nameTitle = document.querySelector(nameTitleSelector);
    this._jobSubtitle = document.querySelector(jobSubTitleSelector);
  }

  getUserInfo(){
    return {
      nameTitleContent: this._nameTitle.textContent,
      jobSubTitleContent: this._jobSubtitle.textContent
    }
  }

  setUserInfo({name, about}){
    this._nameTitle.textContent = name;
    this._jobSubtitle.textContent = about;
  }
}
