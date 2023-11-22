import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {margin, padding, scaleWidth} from '../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    width: scaleWidth(350),
    alignSelf: 'center',
    ...padding(15, 15, 15, 15),
    borderRadius: 10,
    overflow: 'hidden',
  },
  empty: {
    width: '5%',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...margin(0, 0, 25, 0),
  },
  heading: {
    maxWidth: '80%',
    alignSelf: 'center',
    fontFamily: theme.montbold,
  },
  item: {
    fontFamily: theme.montsemibold,
    ...margin(3, 0, 3, 0),
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...margin(30, 0, 0, 0),
  },
  edit: {
    width: '40%',
  },
});
