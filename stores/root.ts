import { ProvidersStore } from './providers';
import { UiStore } from './ui';

export class RootStore {
  public uiStore = new UiStore(this);
  public providersStore = new ProvidersStore(this);
}
