import { Page } from '@shopify/polaris';
import DirectLinkAdd from 'components/downloads/direct-link-add';
import LinksList from 'components/downloads/list';
import MainLayout from 'components/layout';
import Provider from 'components/provider';
import React, { Component } from 'react';

export default class Index extends Component {
  public render() {
    return (
      <Provider>
        <MainLayout pageTitle="Home">
          <Page title="Home" titleHidden={true}>
            <DirectLinkAdd />
            <LinksList />
          </Page>
        </MainLayout>
      </Provider>
    );
  }
}
