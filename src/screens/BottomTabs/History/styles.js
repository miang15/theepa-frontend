import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  bankview: {
    alignItems: 'center',
    width: 100,
    backgroundColor: 'yellow',
  },
  addview: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  empty: {
    width: scaleWidth(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: scaleWidth(350),
    ...padding(0, 15, 0, 0),
    ...margin(30, 0, 0, 0),
  },
  heading: {
    fontFamily: theme.sandbold,
    fontSize: scaleFont(18),
    color: theme.primary,
  },
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    ...margin(1, 0, 1, 0),
  },
  option: {
    maxWidth: '80%',
  },
  history: {
    ...padding(5, 0, 5, 0),
    overflow: 'hidden',
    ...margin(20, 0, 0, 0),
  },
  nodata: {
    alignSelf: 'center',
    ...margin(30, 0, 30, 0),
  },
});
