import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {margin, scaleHeight, scaleSize, scaleWidth} from '../../utils/Layout';

export const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
    alignSelf: 'center',
    maxWidth: scaleWidth(250),
    overflow: 'hidden',
    padding: 5,
  },
  all: {
    borderWidth: 1,
    borderColor: theme.black,
    width: scaleSize(30),
    height: scaleSize(30),
    ...margin(0, 3, 0, 5),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: theme.skyblue,
  },
  account: {
    borderWidth: 1,
    borderColor: theme.black,
    width: scaleSize(30),
    height: scaleSize(30),
    ...margin(0, 5, 0, 5),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: theme.purple,
  },
  name: {
    textAlign: 'center',
    width: scaleWidth(25),
    overflow: 'hidden',
    color: theme.white,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
