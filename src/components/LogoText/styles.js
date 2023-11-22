import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {margin, scaleHeight, scaleSize, scaleWidth} from '../../utils/Layout';
export const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  label: {
    color: theme.black,
    fontFamily: theme.montbold,
    ...margin(5, 0, 5, 0),
    alignSelf: 'center',
    textAlign: 'center',
  },
  theepa: {
    height: scaleSize(30),
    width: scaleSize(100),
  },
  logoview: {
    height: scaleSize(150),
    width: scaleSize(150),
    alignSelf: 'center',
  },
});
