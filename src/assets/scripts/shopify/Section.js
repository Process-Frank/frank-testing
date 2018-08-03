class Section {
  static fromJSON() {
    let section = new Section();
    return section;
  }

  //Instance
  constructor( id, name, clazz, settings ) {
    this.id = id;
    this.name = name;
    this.clazz = clazz;
    this.settings = settings || [];
    this.blocks = blocks || [];
  }
}
