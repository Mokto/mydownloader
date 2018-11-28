import {
  Button,
  FormLayout,
  Modal,
  RadioButton,
  TextField
} from '@shopify/polaris';
import fetch from 'isomorphic-unfetch';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { DownloadsStore } from 'stores/downloads';
import { UiStore } from 'stores/ui';

interface IDirectLinkProps {
  uiStore?: UiStore;
  downloadsStore?: DownloadsStore;
}

@inject('downloadsStore')
@inject('uiStore')
@observer
export default class DirectLink extends Component<IDirectLinkProps> {
  public state = {
    url:
      'magnet:?xt=urn:btih:6a378a8fe70af90d5a8b5a22a35ac4a3d7741548&dn=Game+Of+Thrones+S05+Season+5+1080p+5.1Ch+Web-DL+ReEnc-DeeJayAhme&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969',
    type: 'movie',
    name: '',
    season: '',
    episode: ''
  };

  public setOpenedModal = (modalOpen: boolean) => () => {
    this.props.uiStore.addContentDialog = modalOpen;
  };

  public handleSubmit = async () => {
    const { uiStore } = this.props;
    const { url, type, name, season, episode } = this.state;
    uiStore.loading = true;
    uiStore.error = null;
    try {
      await fetch('http://localhost:9000/download', {
        method: 'post',
        body: JSON.stringify({
          url,
          type,
          name,
          season,
          episode
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      // if (response.status !== 200) {
      //   throw new Error(await response.text());
      // }
    } catch (e) {
      uiStore.error = 'Get Link failed.';
      console.log(e);
    }

    uiStore.loading = false;
    this.setOpenedModal(false)();
  };

  public handleChange = field => {
    return (value, radioValue) =>
      this.setState({ [field]: field === 'type' ? radioValue : value });
  };

  public render() {
    const { url, type, name, season, episode } = this.state;
    const { downloadsStore, uiStore } = this.props;

    const button =
      downloadsStore.downloads.length === 0
        ? []
        : [
            <Button
              key="button"
              primary={true}
              onClick={this.setOpenedModal(true)}
            >
              Add Content
            </Button>,
            <div key="padder" style={{ height: '2rem' }} />
          ];

    return [
      ...button,
      <Modal
        key="modal"
        open={uiStore.addContentDialog}
        onClose={this.setOpenedModal(false)}
        title="Add some content"
        primaryAction={{
          content: 'Add',
          onAction: this.handleSubmit
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: this.setOpenedModal(false)
          }
        ]}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              value={url}
              onChange={this.handleChange('url')}
              label="Content magnet Link"
              type="url"
            />
            <RadioButton
              label="Tv Show"
              checked={type === 'tv-show'}
              id="tv-show"
              name="type"
              onChange={this.handleChange('type')}
            />
            <RadioButton
              label="Movie"
              id="movie"
              name="type"
              checked={type === 'movie'}
              onChange={this.handleChange('type')}
            />
          </FormLayout>
        </Modal.Section>
        <Modal.Section>
          <FormLayout>
            <TextField
              value={name}
              onChange={this.handleChange('name')}
              label="Name"
              type="text"
            />
            {type === 'tv-show' && (
              <TextField
                value={season}
                onChange={this.handleChange('season')}
                label="Season"
                type="number"
              />
            )}
            {type === 'tv-show' && (
              <TextField
                value={episode}
                onChange={this.handleChange('episode')}
                label="Episode (optional)"
                type="number"
              />
            )}
          </FormLayout>
        </Modal.Section>
      </Modal>
    ];
  }
}
