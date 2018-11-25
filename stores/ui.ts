import { observable } from 'mobx';

export class UiStore {
  public rootStore;

  @observable public showMobileNavigation = false;
  @observable public loading = false;
  @observable public error: string;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
