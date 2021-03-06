import { sortDownloads } from 'models/download';
import WebSocket from 'services/websocket';
import { DownloadsStore } from './downloads';
import { ProvidersStore } from './providers';
import { UiStore } from './ui';

export class RootStore {
  public uiStore = new UiStore(this);
  public providersStore = new ProvidersStore(this);
  public downloadsStore = new DownloadsStore(this);

  constructor() {
    if (!(process as any).browser) {
      return;
    }
    try {
      const socket = new WebSocket('ws://localhost:9001');

      socket.onmessage = (eventName, downloads) => {
        if (eventName === 'downloads') {
          this.downloadsStore.downloads = sortDownloads(downloads);
        }
      };

      socket.onerror = () => {
        this.uiStore.isBackendLive = false;
      };
      socket.onopen = () => {
        this.uiStore.isBackendLive = true;
      };
    } catch (e) {
      console.log(e);
    }
  }
}
