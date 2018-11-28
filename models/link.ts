export interface ILink {
  url: string;
  state: LinkState;
  percentage: number;
  size: number;
  speed: number;
}

export enum LinkState {
  LINK_NOT_DEBRIDED = 0,
  LINK_QUEUING = 1,
  LINK_DOWNLOADING = 2,
  LINK_DONE = 3
}
