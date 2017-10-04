import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Scheduler from 'react-native-schedule-sms';
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from 'react-native-admob';

import { savePerson, saveExistingPerson } from '../../db/index';
import { BANNER_ID, TESTDEVICE_ID, Log } from '../../utils/index';

import Header from '../../components/Header/index';
import styles from './styles';

class CreateSMS extends Component {
  constructor(props) {
    super(props);
    this.state = this._initialState();
  }

  componentWillMount() {
    AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
    const navigation = this.props.navigation;
    if (navigation.state.params) {
      const { inEditMode } = navigation.state.params;
      if (inEditMode) {
        const { id, name, number, msg, date } = navigation.state.params;
        this.setState({ id, name, number, msg, date, inEditMode, btnText: 'Save Edited Details' });
      }
    }
  }

  _initialState = () => ({
    id: '',
    name: '',
    number: '',
    msg: '',
    date: 'Select Date & Time',
    btnText: 'Save Details',
    inEditMode: false,
    isDateTimePickerVisible: false,
  });

  _changeName = name => this.setState({ name });
  _changeNumber = number => this.setState({ number });
  _changeMsg = msg => this.setState({ msg });

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (weirdDate) => {
    const date = format(weirdDate, 'dddd Do MMM, HH:mm a');
    const scheduleDate = format(weirdDate, 'ddd MMM DD HH:mm:ss YYYY');
    this.setState({ date, scheduleDate });
    this._hideDateTimePicker();
  };

  _saveDetails = () => {
    const { id, name, number, msg, date, inEditMode } = this.state;
    if (name.length && number.length && msg.length && date !== 'Select Date & Time') {
      if (inEditMode) saveExistingPerson(id, name, number, date, msg);
      else savePerson(name, number, date, msg);
      const scheduleDate = this.state.scheduleDate || format(date, 'ddd MMM DD HH:mm:ss YYYY');
      Scheduler.sendMessage(number, msg, scheduleDate);
      this.setState(this._initialState());
      ToastAndroid.showWithGravity(
        'Details Saved Successfully !',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      AdMobRewarded.requestAd(() => AdMobRewarded.showAd());
      this.props.navigation.navigate('Upcoming SMS');
    } else {
      ToastAndroid.showWithGravity(
        'Enter All Details Correctly',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header title={navigation.state.routeName} navigation={navigation} />
        <Content style={styles.form}>
          <Form>
            <Item floatingLabel>
              <Label>Enter Name</Label>
              <Input value={this.state.name} onChangeText={this._changeName} />
            </Item>
            <Item floatingLabel>
              <Label>Enter Number</Label>
              <Input
                keyboardType="numeric"
                value={this.state.number}
                onChangeText={this._changeNumber}
              />
            </Item>
            <Button style={styles.dateBtn} transparent onPress={this._showDateTimePicker}>
              <Label>{this.state.date}</Label>
            </Button>
            <DateTimePicker
              mode="datetime"
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
            <Item floatingLabel last>
              <Label>Enter Futuro Message</Label>
              <Input
                multiline
                style={styles.msg}
                value={this.state.msg}
                onChangeText={this._changeMsg}
              />
            </Item>
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID={BANNER_ID}
              testDeviceID={TESTDEVICE_ID}
              didFailToReceiveAdWithError={this.bannerError}
            />
            <Button block info onPress={this._saveDetails} style={styles.btn}>
              <Text>{this.state.btnText}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

CreateSMS.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CreateSMS;
