import { observable } from 'mobx';

export class LinksStore {
  public rootStore;

  @observable public links: Array<{
    id: number;
    url: string;
    name: string;
    type: 'movie' | 'tv-show';
    season: number;
    episode: number;
    torrentDebriding: boolean;
    linkDownloading: boolean;
    percentage: number;
    size: number;
    speed: number;
  }> = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
