export default class Destination {
  constructor(id, name, description, photos) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.photos = photos;
  }

  hasInfo() {
    return Boolean(this.description || (this.photos && this.photos.length > 0));
  }
}
