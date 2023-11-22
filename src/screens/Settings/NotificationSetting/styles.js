import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {margin} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  back: {
    ...margin(5, 0, 30, 5),
  },
  heading: {
    fontFamily: theme.sandbold,
    ...margin(15, 10, 50, 20),
    fontSize: 20,
    color: theme.primary,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...margin(20, 10, 20, 10),
  },
  sync: {
    fontFamily: theme.montbold,
  },
});
