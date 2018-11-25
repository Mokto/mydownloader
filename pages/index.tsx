import { Button, Card, Layout, Page } from '@shopify/polaris';
import MainLayout from 'components/layout';
import Provider from 'components/provider';
import fetch from 'isomorphic-unfetch';
import React, { PureComponent } from 'react';

export default class Index extends PureComponent {
  public render() {
    return (
      <Provider>
        <MainLayout pageTitle="Home">
          <Page title="Home">
            {/* <Layout>
            <Layout.Section>
              <Card sectioned={true}>
                <Button onClick={this.loginAllDebrid}>Login</Button>
              </Card>
            </Layout.Section>
          </Layout> */}
          </Page>
        </MainLayout>
      </Provider>
    );
  }
}
