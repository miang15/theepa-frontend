import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {margin} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  back: {
    ...margin(15, 0, 30, 5),
  },
  update: {
    ...margin(50, 0, 0, 0),
  },
  error: {
    color: theme.red,
    ...margin(0, 0, 0, 20),
  },
});
