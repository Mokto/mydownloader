import { observable } from 'mobx';
import { IDownload } from 'models/download';

export class DownloadsStore {
  public rootStore;

  @observable public downloads: IDownload[] = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
