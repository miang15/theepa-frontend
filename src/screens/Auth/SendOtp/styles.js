import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {margin} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },

  error: {
    color: theme.red,
    ...margin(0, 20, 0, 20),
  },
  socialemail: {
    ...margin(30, 20, 10, 20),
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: theme.sandregular,
    color: theme.darkestgray,
  },
});
