import ThemeSections from './../components/sections/ThemeSections';
import { templateFetch } from './../utils/URLUtilities'

export default class ShopifySection {
  static async fetchIndexSections(template) {
    let data = await templateFetch('/', undefined, 'json-sections');
    return data;
  }

  static fromJSON(json) {
    let section = new ShopifySection(
      json.id,
      json.name,
      json.class,
      json.componentName,
      json.group,
      json.settings,
      json.blocks
    );
    return section;
  }

  //Instance
  constructor( id, name, clazz, component, group, settings, blocks) {
    if(!id) throw new Error("Invalid Section! (Missing ID)");
    if(!name) throw new Error("Invalid Section! (Missing Name)");
    if(!component) throw new Error("Invalid Section! (Missing Component)");
    if(!group) throw new Error("Invalid Section! (Missing Group)");

    //Required attributes
    this.id = id;
    this.name = name;
    this.component = component;
    this.group = group;

    //Optional Attributes
    this.clazz = clazz;
    this.settings = settings || [];//Raw settings array
    this.blocks = blocks || [];

    //TODO: Map the setting types to a common useable format (e.g. images etc)
    this.settingsById = {};
    for(let i = 0; i < this.settings.length; i++) {
      let s = this.settings[i];
      this.settingsById[s.id] = s;
    }
  }

  //High Level API
  getComponent() {return ThemeSections[this.component];}
  getSetting(name) { return this.settingsById[name] || null; }
}
