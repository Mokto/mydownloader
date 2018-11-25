import { Navigation } from '@shopify/polaris';
import Router from 'next/router';
import React, { PureComponent } from 'react';

export default class LeftNavigation extends PureComponent {
  public goTo = path => () => {
    Router.push(path);
  };

  public render() {
    return (
      <Navigation location="/">
        <Navigation.Section
          title="Misc"
          items={[
            {
              label: 'Account',
              icon: 'home',
              onClick: this.goTo('/')
            },
            {
              label: 'Test',
              icon: 'orders',
              onClick: this.goTo('/test')
            }
          ]}
        />
        <Navigation.Section
          title="Settings"
          items={[
            {
              label: 'Providers',
              icon: 'notes',
              onClick: this.goTo('/providers')
            }
          ]}
          separator={true}
        />
      </Navigation>
    );
  }
}
