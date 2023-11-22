import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {margin, padding} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    padding: 10,
  },
  back: {
    ...margin(15, 0, 10, 5),
  },
});
