import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {margin, scaleFont, scaleHeight} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  heading: {
    fontFamily: theme.sandbold,
    ...margin(10, 10, 10, 10),
    color: theme.primary,
    fontSize: scaleFont(22),
  },
  active: {
    fontFamily: theme.sandbold,
    ...margin(15, 10, 5, 20),
    color: theme.primary,
    fontSize: scaleFont(20),
  },
  activelist: {
    flexGrow: 0,
    maxHeight: scaleHeight(160),
  },
  completed: {
    fontFamily: theme.sandbold,
    ...margin(25, 10, 5, 20),
    color: theme.primary,
    fontSize: scaleFont(20),
  },
  add: {
    ...margin(100, 0, 15, 0),
  },
  nodata: {
    alignSelf: 'center',
    ...margin(20, 30, 0, 0),
  },
});
