import {StyleSheet} from 'react-native';
import {
  margin,
  scaleFont,
  scaleHeight,
  scaleSize,
  scaleWidth,
} from '../../utils/Layout';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    ...margin(5, 0, 5, 10),
  },
  banknames: {
    width: '100%',
    fontSize: scaleFont(9),
    alignSelf: 'center',
    textAlign: 'center',
    height: scaleHeight(20),
  },
  addview: {
    width: scaleWidth(70),
    alignItems: 'center',
    overflow: 'hidden',
    ...margin(5, 0, 0, 0),
  },
  add: {
    width: scaleSize(40),
    height: scaleSize(40),
    ...margin(0, 0, 3, 0),
  },
  banks: {
    flexGrow: 0,
    width: '100%',
  },
  bankview: {
    width: scaleWidth(70),
    alignItems: 'center',
    overflow: 'hidden',
    ...margin(0, 5, 0, 0),
  },
  imgview: {
    width: scaleSize(50),
    height: scaleSize(50),
    borderWidth: 1,
    borderColor: theme.lightgrey,
    padding: 5,
    borderRadius: 10,
  },
});
