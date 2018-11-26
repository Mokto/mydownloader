import { Card, EmptyState, Layout } from '@shopify/polaris';
import { inject, observer } from 'mobx-react';
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
        {links.map(link => (
          <Layout.Section key={link.id} secondary={true}>
            <Card
              sectioned={true}
              title={link.name}
              actions={[{ content: 'Delete' }]}
            >
              <p>
                Add variants if this product comes in multiple versions, like
                different sizes or colors.
              </p>
            </Card>
          </Layout.Section>
        ))}
      </Layout>
    );
  }
}
