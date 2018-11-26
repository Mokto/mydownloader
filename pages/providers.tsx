import { Layout, Page } from '@shopify/polaris';
import MainLayout from 'components/layout';
import Provider, { rootStore } from 'components/provider';
import AllDebridLoginForm from 'forms/alldebrid-login';
import React, { PureComponent } from 'react';

export default class Providers extends PureComponent {
  public static async getInitialProps() {
    try {
      const res = await fetch('http://localhost:9000/providers/status');
      const providers = await res.json();
      return { providers };
    } catch (e) {
      return {};
    }
  }

  constructor(props) {
    super(props); // use initial server values to initialize the client props
    rootStore.providersStore.providers = props.providers;
  }

  public render() {
    return (
      <Provider>
        <MainLayout pageTitle="Providers">
          <Page title="Providers">
            <Layout>
              <Layout.Section>
                <AllDebridLoginForm />
              </Layout.Section>
              {/* <Layout.Section>
              <AllDebridLoginForm />
            </Layout.Section> */}
            </Layout>
          </Page>
        </MainLayout>
      </Provider>
    );
  }
}
