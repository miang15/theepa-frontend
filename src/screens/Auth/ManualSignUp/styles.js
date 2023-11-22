import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {margin} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },

  signUp: {
    ...margin(50, 0, 0, 0),
  },
  error: {
    color: theme.red,
    marginHorizontal: theme.wp('10%'),
  },
  manual: {
    color: theme.skyblue,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  signin: {color: theme.black, alignSelf: 'center', ...margin(20, 0, 0, 0)},
});
