import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { AdMobInterstitial, AdMobBanner } from 'react-native-admob';

import Header from '../../components/Header/index';
import List from '../../components/List/index';
import { getAllPeople, deletePerson } from '../../db/index';
import { BANNER_ID, TESTDEVICE_ID } from '../../utils/index';
import Empty from './Empty';
import styles from './styles';

class UpcomingSMS extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  componentWillMount() {
    const temp = getAllPeople();
    const items = Object.keys(temp).map(key => temp[key]);
    this.setState({ items });
    AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
  }

  _renderList = (items, navigation) => {
    if (!items.length) return <Empty />;
    return <List items={items} deletePerson={this._deletePerson} navigation={navigation} />;
  };

  _deletePerson = (id) => {
    const items = this.state.items.filter(item => item.id !== id);
    this.setState({ items });
    deletePerson(id);
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header title={navigation.state.routeName} navigation={navigation} />
        <Content contentContainerStyle={styles.content}>
          {this._renderList(this.state.items, navigation)}
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID={BANNER_ID}
            testDeviceID={TESTDEVICE_ID}
            didFailToReceiveAdWithError={this.bannerError}
          />
        </Content>
      </Container>
    );
  }
}

export default UpcomingSMS;
