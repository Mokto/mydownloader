import { Provider } from 'mobx-react';
import Router from 'next/router';
import React, { PureComponent } from 'react';
import { RootStore } from 'stores/root';

const rootStore = new RootStore();

export default class LeftNavigation extends PureComponent {
  public goTo = path => () => {
    Router.push(path);
  };

  public render() {
    return (
      <Provider
        rootStore={rootStore}
        uiStore={rootStore.uiStore}
        providersStore={rootStore.providersStore}
      >
        {this.props.children}
      </Provider>
    );
  }
}
