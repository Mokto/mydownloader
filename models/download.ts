import { ILink } from './link';

export interface IDownload {
  id: number;
  name: string;
  type: 'movie' | 'tv-show';
  season: number;
  episode: number;

  torrentUrl: string;
  torrentState: TorrentState;
  downloadState: DownloadState;
  percentage: number;
  size: number;
  speed: number;

  links?: ILink[];
}

export enum TorrentState {
  TORRENT_QUEUING = 0,
  TORRENT_DOWNLOADING = 1,
  TORRENT_UPLOADING = 2,
  TORRENT_DONE = 3
}

export enum DownloadState {
  DOWNLOAD_NOT_READY = 0,
  DOWNLOAD_DEBRIDING = 1,
  DOWNLOAD_QUEUING = 2,
  DOWNLOAD_DOWNLOADING = 3,
  DOWNLOAD_DECOMPRESSING = 4,
  DOWNLOAD_DONE = 5
}
