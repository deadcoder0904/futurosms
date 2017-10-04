import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    top: -1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$theme',
  },
  logo: {
    width: 250,
    height: 250,
  },
  listItem: {
    flex: 1,
  },
  text: {
    color: '$black',
  },
});

export default styles;
