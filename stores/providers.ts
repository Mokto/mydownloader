import fetch from 'isomorphic-unfetch';
import { observable } from 'mobx';

export class ProvidersStore {
  public rootStore;

  @observable public providers: {
    allDebrid: boolean;
  };

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.load();
  }

  public async load() {
    try {
      const response = await fetch('http://localhost:9000/providers/status');

      if (response.status !== 200) {
        throw new Error(await response.text());
      }

      this.providers = await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  public isLoggedIn(provider: string): boolean {
    return this.providers && this.providers[provider];
  }
}
