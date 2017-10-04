import Reactotron from 'reactotron-react-native';

export const randomColorGenerator = () =>
  `#${Math.random()
    .toString(16)
    .substr(-6)}`;

export const formatDate = (date) => {
  const temp = date.split(' ');
  temp.shift();
  return temp.join(' ');
};

export const BANNER_ID = 'ca-app-pub-1425926517331745/2471313698';
export const INTERSTITIAL_ID = 'ca-app-pub-1425926517331745/9354190316';
export const REWARDED_ID = 'ca-app-pub-1425926517331745/5770168523';
export const TESTDEVICE_ID = 'EMULATOR';
export const Log = text => Reactotron.log(text);
