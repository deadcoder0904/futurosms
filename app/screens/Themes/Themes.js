import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { Container, Content, ListItem, H3, Body, Button, Text } from 'native-base';
import { v4 } from 'react-native-uuid';
import PropTypes from 'prop-types';
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from 'react-native-admob';

import Header from '../../components/Header/index';
import { saveTheme, getTheme } from '../../db/index';
import colors from '../../db/colors';
import { BANNER_ID, TESTDEVICE_ID } from '../../utils/index';

import styles from './styles';

class Themes extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      colors,
      selectedTheme: null,
    };
  }

  componentWillMount() {
    const theme = getTheme();
    const selectedTheme = this.state.colors.map(color => color.value).indexOf(theme);
    this.setState({ selectedTheme });
    AdMobInterstitial.requestAd(AdMobInterstitial.showAd);
  }

  _selectedTheme = i => this.setState({ selectedTheme: i });

  _renderThemes = () =>
    this.state.colors.map((color, i) => (
      <ListItem
        style={[styles.listItem, this.state.selectedTheme === i && styles.selectedTheme]}
        onPress={() => this._selectedTheme(i)}
        key={v4()}
      >
        <Body style={styles.body}>
          <View style={[styles.color, { backgroundColor: color.value }]} />
          <H3 style={styles.text}>{color.name}</H3>
        </Body>
      </ListItem>
    ));

  _saveTheme = () => {
    const { colors, selectedTheme } = this.state;
    ToastAndroid.showWithGravity(
      'Restart your app to see new theme',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    saveTheme(colors[selectedTheme].value);
    AdMobRewarded.requestAd(() => AdMobRewarded.showAd());
    AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header title={navigation.state.routeName} navigation={navigation} />
        <Content>
          {this._renderThemes()}
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID={BANNER_ID}
            testDeviceID={TESTDEVICE_ID}
            didFailToReceiveAdWithError={this.bannerError}
          />
          <Button block info onPress={this._saveTheme} style={styles.btn}>
            <Text style={[styles.text, styles.btnText]}>Save Theme</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Themes;
