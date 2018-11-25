import { AppProvider, Frame, Loading, Toast } from '@shopify/polaris';
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
        background: '#357997'
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

  public render() {
    const { pageTitle, children, uiStore } = this.props;

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
        <AppProvider theme={this.theme}>
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
        </AppProvider>
      </div>
    );
  }
}
