import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    width: theme.wp('95%'),
  },
  label: {
    color: theme.black,
  },
});
