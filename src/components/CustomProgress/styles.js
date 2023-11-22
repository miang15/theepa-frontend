import {StyleSheet} from 'react-native';
import {margin, scaleHeight, scaleWidth} from '../../utils/Layout';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  centerview: {
    width: scaleWidth(335),
    ...margin(5, 0, 3, 0),
    alignSelf: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scaleWidth(335),
    overflow: 'hidden',
  },
  income: {
    maxWidth: '60%',
    ...margin(0, 5, 0, 0),
    color: theme.primary,
    fontFamily: theme.sandregular,
    textTransform: 'capitalize',
  },
  incomevalue: {
    maxWidth: '40%',
    color: theme.primary,
    fontFamily: theme.sandregular,
  },
  progress: {
    width: scaleWidth(335),
    height: scaleHeight(21),
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.secondary,
    borderRadius: 15,
    overflow: 'hidden',
  },
});
