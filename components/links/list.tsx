import {
  Card,
  DescriptionList,
  EmptyState,
  Layout,
  ProgressBar
} from '@shopify/polaris';
import { inject, observer } from 'mobx-react';
import { DownloadState, ILink, TorrentState } from 'models/link';
import React, { Component } from 'react';
import { LinksStore } from 'stores/links';
import { UiStore } from 'stores/ui';

interface ILinkListsProps {
  linksStore?: LinksStore;
  uiStore?: UiStore;
}

@inject('linksStore')
@inject('uiStore')
@observer
export default class LinkLists extends Component<ILinkListsProps> {
  public delete = (link: ILink) => async () => {
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

  public getTitle = (link: ILink) => {
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

  public estimate(link: ILink) {
    if (!link.speed) {
      return '?';
    }
    const remaining = (link.size * (100 - link.percentage)) / 100;
    const seconds = Math.round(remaining / link.speed);
    return new Date(seconds * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
  }

  public getState = (link: ILink) => {
    if (link.torrentState === TorrentState.TORRENT_DONE) {
      switch (link.downloadState) {
        case DownloadState.DOWNLOAD_NOT_READY:
        case DownloadState.DOWNLOAD_DEBRIDING:
          return 'Getting downloadable link (4/6)';
        case DownloadState.DOWNLOAD_DOWNLOADING:
          return 'File(s) downloading (5/6)';
        case DownloadState.DOWNLOAD_DECOMPRESSING:
          return 'File(s) being decompressed (6/6)';
        case DownloadState.DOWNLOAD_DONE:
          return 'File(s) downloaded';
      }
    }
    switch (link.torrentState) {
      case TorrentState.TORRENT_QUEUING:
        return 'Torrent queuing (1/5)';
      case TorrentState.TORRENT_DOWNLOADING:
        return 'Torrent downloading (2/5)';
      case TorrentState.TORRENT_UPLOADING:
        return 'Torrent uploading (3/5)';
    }
  };

  public shouldShowProgress = (link: ILink) => {
    return (
      link.torrentState === TorrentState.TORRENT_DOWNLOADING ||
      link.torrentState === TorrentState.TORRENT_UPLOADING
    );
  };

  public render() {
    const { linksStore } = this.props;
    const { links } = linksStore;
    if (links.length === 0) {
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
        {links.map(link => {
          const items = [
            {
              term: 'State',
              description: this.getState(link)
            }
          ];
          if (link.torrentState !== TorrentState.TORRENT_QUEUING) {
            items.push({
              term: 'Size',
              description: `${this.toMB(link.size)}MB`
            });
          }
          if (this.shouldShowProgress(link)) {
            items.push({
              term: 'Estimated',
              description: `${this.estimate(link)} (${this.toMB(
                link.speed
              )}MB/s)`
            });
          }
          return (
            <Layout.Section key={link.id} secondary={true}>
              <Card
                sectioned={true}
                title={this.getTitle(link)}
                actions={[{ content: 'Delete', onAction: this.delete(link) }]}
              >
                <DescriptionList items={items} />
                {this.shouldShowProgress(link) && (
                  <ProgressBar progress={link.percentage} />
                )}
                {/* {link.links &&
                  link.links.length &&
                  link.links.map(linkUrl => <p key="link">{linkUrl}</p>)} */}
              </Card>
            </Layout.Section>
          );
        })}
      </Layout>
    );
  }
}
