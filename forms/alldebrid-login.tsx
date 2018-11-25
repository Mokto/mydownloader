import {
  AccountConnection,
  Avatar,
  FormLayout,
  TextField
} from '@shopify/polaris';
import fetch from 'isomorphic-unfetch';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { ProvidersStore } from 'stores/providers';
import { UiStore } from 'stores/ui';

interface IAllDebridLoginProps {
  providersStore?: ProvidersStore;
  uiStore?: UiStore;
}

@inject('providersStore')
@inject('uiStore')
@observer
export default class AllDebridLogin extends Component<IAllDebridLoginProps> {
  public state = {
    name: '',
    password: ''
  };

  public renderForm = () => (
    <FormLayout>
      <TextField
        id="name"
        label="Account Name"
        value={this.state.name}
        onChange={this.handleNameFieldChange}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        value={this.state.password}
        onChange={this.handlePasswordFieldChange}
      />
    </FormLayout>
  );

  public handleNameFieldChange = name => {
    this.setState({ name });
  };

  public handlePasswordFieldChange = password => {
    this.setState({ password });
  };

  public login = async () => {
    const { uiStore, providersStore } = this.props;
    uiStore.loading = true;
    uiStore.error = null;
    try {
      const response = await fetch('http://localhost:9000/alldebrid/login', {
        method: 'post',
        body: JSON.stringify({
          username: this.state.name,
          password: this.state.password
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status !== 200) {
        throw new Error(await response.text());
      }
      providersStore.providers.allDebrid = true;
    } catch (e) {
      uiStore.error = 'Login failed.';
      console.log(e);
    }

    uiStore.loading = false;
  };

  public logout = async () => {
    const { uiStore, providersStore } = this.props;
    uiStore.loading = true;
    uiStore.error = null;
    try {
      await fetch('http://localhost:9000/alldebrid/logout', {
        method: 'post'
      });
      providersStore.providers.allDebrid = false;
    } catch (e) {
      uiStore.error = 'Logout failed.';
      console.log(e);
    }
    uiStore.loading = false;
  };

  public onAction = () => {
    if (this.props.providersStore.isLoggedIn('allDebrid')) {
      this.logout();
    } else {
      this.login();
    }
  };

  public render() {
    const connected = this.props.providersStore.isLoggedIn('allDebrid');
    const buttonText = connected ? 'Disconnect' : 'Connect';

    return (
      <AccountConnection
        // accountName="AllDebrid"
        avatarUrl="/static/alldebrid.png"
        connected={connected}
        title="Alldebrid"
        action={{
          content: buttonText,
          onAction: this.onAction
        }}
        details={
          connected ? (
            'Account Connected'
          ) : (
            <Avatar
              customer={true}
              name="Alldebrid"
              source="/static/alldebrid.png"
            />
          )
        }
        termsOfService={!connected ? this.renderForm() : null}
      />
    );
  }
}
