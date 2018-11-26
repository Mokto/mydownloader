import { Page } from '@shopify/polaris';
import MainLayout from 'components/layout';
import DirectLink from 'components/links/direct-link';
import LinksList from 'components/links/list';
import Provider from 'components/provider';
import React, { Component } from 'react';

export default class Index extends Component {
  public render() {
    return (
      <Provider>
        <MainLayout pageTitle="Home">
          <Page title="Home" titleHidden={true}>
            <DirectLink />
            <LinksList />
          </Page>
        </MainLayout>
      </Provider>
    );
  }
}
