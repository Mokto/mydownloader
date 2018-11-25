import { Layout, Page } from '@shopify/polaris';
import MainLayout from 'components/layout';
import Provider from 'components/provider';
import AllDebridLoginForm from 'forms/alldebrid-login';
import React, { PureComponent } from 'react';

export default class Providers extends PureComponent {
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
