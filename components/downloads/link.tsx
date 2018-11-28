import { ProgressBar } from '@shopify/polaris';
import { observer } from 'mobx-react';
import { ILink } from 'models/link';
import React, { Component } from 'react';

interface ILinkListsProps {
  link: ILink;
}

@observer
export default class Lonk extends Component<ILinkListsProps> {
  public getLinkName(link: ILink) {
    return link.url.substring(link.url.lastIndexOf('/') + 1);
  }

  public render() {
    const { link } = this.props;
    // const { downloads } = downloadsStore;

    return (
      <div>
        {this.getLinkName(link)}
        <br />
        <ProgressBar progress={link.percentage} />
      </div>
    );
  }
}
