import {
  Card,
  DescriptionList,
  EmptyState,
  Layout,
  ProgressBar
} from '@shopify/polaris';
import { inject, observer } from 'mobx-react';
import { DownloadState, IDownload, TorrentState } from 'models/download';
import { ILink } from 'models/link';
import React, { Component } from 'react';
import { DownloadsStore } from 'stores/downloads';
import { UiStore } from 'stores/ui';
import Link from './link';

interface ILinkListsProps {
  downloadsStore?: DownloadsStore;
  uiStore?: UiStore;
}

@inject('downloadsStore')
@inject('uiStore')
@observer
export default class DownloadsList extends Component<ILinkListsProps> {
  public delete = (link: IDownload) => async () => {
    const { uiStore } = this.props;
    uiStore.loading = true;
    uiStore.error = null;
    try {
      await fetch(`http://localhost:9000/download/${link.id}`, {
        method: 'delete'
      });
    } catch (e) {
      uiStore.error = 'Delete Link failed.';
      console.log(e);
    }

    uiStore.loading = false;
  };

  public openDialog = () => {
    this.props.uiStore.addContentDialog = true;
  };

  public getTitle = (link: IDownload) => {
    if (!link.name) {
      return link.id;
    }
    let name = link.name;
    if (link.type === 'tv-show' && link.season) {
      name += ` - S${link.season}`;
    }
    if (link.type === 'tv-show' && link.episode) {
      name += ` - E${link.episode}`;
    }
    return name;
  };

  public toMB(bytes: number) {
    return Math.round(bytes * 0.00000095367432);
  }

  public estimate(link: IDownload) {
    if (!link.speed) {
      return '?';
    }
    const remaining = (link.size * (100 - link.percentage)) / 100;
    const seconds = Math.round(remaining / link.speed);
    return new Date(seconds * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
  }

  public getState = (link: IDownload) => {
    if (link.torrentState === TorrentState.TORRENT_DONE) {
      switch (link.downloadState) {
        case DownloadState.DOWNLOAD_NOT_READY:
        case DownloadState.DOWNLOAD_DEBRIDING:
          return 'Getting downloadable link (4/7)';
        case DownloadState.DOWNLOAD_QUEUING:
          return 'In download queue (5/7)';
        case DownloadState.DOWNLOAD_DOWNLOADING:
          return 'File(s) downloading (6/7)';
        case DownloadState.DOWNLOAD_DECOMPRESSING:
          return 'File(s) being decompressed (7/7)';
        case DownloadState.DOWNLOAD_DONE:
          return 'File(s) downloaded';
      }
    }
    switch (link.torrentState) {
      case TorrentState.TORRENT_QUEUING:
        return 'Torrent queuing (1/7)';
      case TorrentState.TORRENT_DOWNLOADING:
        return 'Torrent downloading (2/7)';
      case TorrentState.TORRENT_UPLOADING:
        return 'Torrent uploading (3/7)';
    }
  };

  public shouldShowProgress = (link: IDownload) => {
    return (
      link.torrentState === TorrentState.TORRENT_DOWNLOADING ||
      link.torrentState === TorrentState.TORRENT_UPLOADING ||
      link.downloadState === DownloadState.DOWNLOAD_DOWNLOADING
    );
  };

  public getLinkName(link: ILink) {
    return link.url.substring(link.url.lastIndexOf('/') + 1);
  }

  public render() {
    const { downloadsStore } = this.props;
    const { downloads } = downloadsStore;

    if (!downloadsStore.downloads) {
      return null;
    }

    if (downloads.length === 0) {
      return (
        <EmptyState
          heading="Manage your video content"
          action={{ content: 'Add content', onAction: this.openDialog }}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>You can add TV Shows and Movies easily.</p>
        </EmptyState>
      );
    }

    return (
      <Layout>
        {downloads.map(download => {
          const items = [
            {
              term: 'State',
              description: this.getState(download)
            }
          ];
          if (download.torrentState !== TorrentState.TORRENT_QUEUING) {
            items.push({
              term: 'Size',
              description: `${this.toMB(download.size)}MB`
            });
          }
          if (this.shouldShowProgress(download)) {
            items.push({
              term: 'Estimated',
              description: `${this.estimate(download)} (${this.toMB(
                download.speed
              )}MB/s)`
            });
          }
          return (
            <Layout.Section key={download.id} secondary={true}>
              <Card
                sectioned={true}
                title={this.getTitle(download)}
                actions={[
                  { content: 'Delete', onAction: this.delete(download) }
                ]}
              >
                <DescriptionList items={items} />
                {this.shouldShowProgress(download) && (
                  <ProgressBar progress={download.percentage} />
                )}
                {download.links &&
                  download.links.length &&
                  download.links.map(link => (
                    <Link key={link.url} link={link} />
                  ))}
              </Card>
            </Layout.Section>
          );
        })}
      </Layout>
    );
  }
}
