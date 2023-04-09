/* import { Api } from "./api.js";
import { apiConfig } from "../utils/apiConfig.js"; */
export default class Section {
  constructor({items, renderer}, container){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems(){
/*     const api = new Api(apiConfig)
    api.getCards()
    .then((data)=>{
      data.forEach((item) => {
        this._renderer(item);
      })
    }) */
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(element){
    this._container.prepend(element);
  }
}
