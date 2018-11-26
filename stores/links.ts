import { observable } from 'mobx';
import { ILink } from 'models/link';

export class LinksStore {
  public rootStore;

  @observable public links: ILink[] = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
