import {
  Card,
  DescriptionList,
  EmptyState,
  Layout,
  ProgressBar
} from '@shopify/polaris';
import { inject, observer } from 'mobx-react';
import { ILink } from 'models/link';
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
    return `${Math.round(remaining / link.speed)}s`;
  }

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

    const done = false

    return (
      <Layout>
        {links.map(link => {
          const items = [
            {
              term: 'State',
              description: link.
                ? 'Downloaded'
                : link.torrentDownloading
                ? 'Downloading torrent (1/2)'
                : link.torrentUploading
                ? 'Uploading torrent (2/2)'
            },
            {
              term: 'Size',
              description: `${this.toMB(link.size)}MB`
            }
          ];
          if (!done) {
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
                actions={[{ content: 'Delete' }]}
              >
                <DescriptionList items={items} />
                <ProgressBar progress={done ? 100 : link.percentage} />
              </Card>
            </Layout.Section>
          );
        })}
      </Layout>
    );
  }
}
