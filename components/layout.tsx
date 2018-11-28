import {
  AppProvider,
  EmptyState,
  Frame,
  Loading,
  Toast
} from '@shopify/polaris';
import Header from 'components/header';
import Navigation from 'components/navigation';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React, { Component } from 'react';
import { UiStore } from 'stores/ui';

// import '@shopify/polaris/styles.css';

interface ILayoutProps {
  pageTitle: string;
  uiStore?: UiStore;
}

@inject('uiStore')
@observer
export default class MainLayout extends Component<ILayoutProps> {
  public theme = {
    colors: {
      topBar: {
        background: '#6371c7'
      }
    },
    logo: {
      width: 124,
      topBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
      contextualSaveBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
      url: 'http://jadedpixel.com',
      accessibilityLabel: 'Downloader manager'
    }
  };

  public navigationDismiss = () => {
    this.props.uiStore.showMobileNavigation = false;
  };

  public errorDismiss = () => {
    this.props.uiStore.error = null;
  };

  public renderContent() {
    const { children, uiStore } = this.props;
    if (!uiStore.isBackendLive) {
      return (
        <EmptyState
          heading="The MyDownloader server is offline"
          action={{
            content: 'Go to Github.com to ask for assistance',
            external: true,
            url: 'https://github.com/mokto/mydownloader'
          }}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          {/* <p>You can add TV Shows and Movies easily.</p> */}
        </EmptyState>
      );
    }

    return (
      <Frame
        topBar={<Header />}
        navigation={<Navigation />}
        showMobileNavigation={uiStore.showMobileNavigation}
        onNavigationDismiss={this.navigationDismiss}
      >
        {uiStore.loading && <Loading />}
        {uiStore.error && (
          <Toast
            content={uiStore.error}
            error={true}
            onDismiss={this.errorDismiss}
          />
        )}
        {children}
      </Frame>
    );
  }

  public render() {
    const { pageTitle } = this.props;

    return (
      <div>
        <Head>
          <title>{pageTitle} | MyDownloader</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://sdks.shopifycdn.com/polaris/3.1.1/polaris.min.css"
          />
        </Head>
        <AppProvider theme={this.theme}>{this.renderContent()}</AppProvider>
      </div>
    );
  }
}
