import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {margin, scaleFont} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  heading: {
    fontFamily: theme.sandbold,
    ...margin(5, 10, 10, 10),
    color: theme.primary,
    fontSize: scaleFont(22),
  },
  expense: {
    ...margin(10, 15, 5, 15),
  },
  expenselist: {
    alignSelf: 'center',
    flexGrow: 0,
  },
  add: {
    color: theme.skyblue,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    alignSelf: 'center',
    ...margin(10, 0, 10, 0),
  },
});
