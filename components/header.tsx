import { ActionList, Card, TopBar } from '@shopify/polaris';
import { inject } from 'mobx-react';
import React, { Component } from 'react';
import { UiStore } from 'stores/ui';

interface IHeaderProps {
  uiStore?: UiStore;
}

@inject('uiStore')
export default class Header extends Component<IHeaderProps> {
  public state = {
    searchActive: false,
    searchText: ''
  };

  public toggleState = key => {
    return () => {
      this.setState(prevState => ({ [key]: !prevState[key] }));
    };
  };

  public handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: ''
      };
    });
  };

  public handleSearchFieldChange = value => {
    this.setState({ searchText: value });
    if (value.length > 0) {
      this.setState({ searchActive: true });
    } else {
      this.setState({ searchActive: false });
    }
  };

  public showMobileNavigation = () => {
    this.props.uiStore.showMobileNavigation = true;
  };

  public render() {
    const { searchActive, searchText } = this.state;

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            { content: 'Shopify help center' },
            { content: 'Community forums' }
          ]}
        />
      </Card>
    );
    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={this.handleSearchFieldChange}
        value={searchText}
        placeholder="Search"
      />
    );

    return (
      <TopBar
        showNavigationToggle={true}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={this.handleSearchResultsDismiss}
        onNavigationToggle={this.showMobileNavigation}
      />
    );
  }
}
