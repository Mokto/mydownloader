import { observable } from 'mobx';

export class UiStore {
  public rootStore;

  @observable public showMobileNavigation = false;
  @observable public loading = false;
  @observable public error: string;
  @observable public addContentDialog: boolean = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
