import WebSocket from 'services/websocket';
import { LinksStore } from './links';
import { ProvidersStore } from './providers';
import { UiStore } from './ui';

export class RootStore {
  public uiStore = new UiStore(this);
  public providersStore = new ProvidersStore(this);
  public linksStore = new LinksStore(this);

  constructor() {
    if (!(process as any).browser) {
      return;
    }
    try {
      const socket = new WebSocket('ws://localhost:9001');

      socket.onmessage = (eventName, links) => {
        if (eventName === 'links') {
          this.linksStore.links = links;
        }
      };
    } catch (e) {
      console.log(e);
    }
  }
}
