import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  listItem: {
    paddingHorizontal: 10,
  },
  selectedTheme: {
    backgroundColor: '#eaeaea',
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  text: {
    marginHorizontal: 10,
    padding: 5,
    color: '$black',
  },
  btnText: {
    color: '$white',
  },
  btn: {
    margin: 10,
    backgroundColor: '$theme',
  },
});

export default styles;
