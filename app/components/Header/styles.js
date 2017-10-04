import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  header: {
    backgroundColor: '$headerBg',
  },
  body: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    color: '$black',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
});

export default styles;
