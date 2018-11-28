import { Page } from '@shopify/polaris';
import DirectLinkAdd from 'components/downloads/direct-link-add';
import LinksList from 'components/downloads/list';
import MainLayout from 'components/layout';
import Provider, { rootStore } from 'components/provider';
import React, { Component } from 'react';

export default class Index extends Component {
  public static async getInitialProps() {
    try {
      const res = await fetch('http://localhost:9000/download');
      const downloads = (await res.json()).reverse();
      return { downloads };
    } catch (e) {
      return {};
    }
  }

  constructor(props) {
    super(props); // use initial server values to initialize the client props
    rootStore.downloadsStore.downloads = props.downloads;
  }

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
