export default class UserInfo {
  constructor({nameTitleSelector, jobSubTitleSelector, avatarImgSelector}){
    this._info = null
    this._nameTitle = document.querySelector(nameTitleSelector);
    this._jobSubtitle = document.querySelector(jobSubTitleSelector);
    this._avatarElement = document.querySelector(avatarImgSelector);
  }

  getUserInfo(){
    return {
      nameTitleContent: this._nameTitle.textContent,
      jobSubTitleContent: this._jobSubtitle.textContent
    }
  }

  setUserInfo(data){
    this._info = data
    this._avatarElement.src = data.avatar;
    this._nameTitle.textContent = data.name;
    this._jobSubtitle.textContent = data.about;
  }
}
