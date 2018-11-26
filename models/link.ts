export interface ILink {
  id: number;
  url: string;
  name: string;
  type: 'movie' | 'tv-show';
  season: number;
  episode: number;
  torrentDownloading: boolean;
  torrentUploading: boolean;
  linkDownloading: boolean;
  percentage: number;
  size: number;
  speed: number;
}
