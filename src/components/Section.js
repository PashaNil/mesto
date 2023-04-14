export default class Section {
  constructor({items, renderer}, container){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems(items){
    this._items = items;
    this._items.forEach((item) => {
      this.addItem(this._renderer(item))
    })
  }

  addItem(element){
    this._container.prepend(element);
  }
}
