import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {margin, padding, scaleSize} from '../../utils/Layout';

export const styles = StyleSheet.create({
  row: {
    backgroundColor: theme.secondary,
    maxWidth: '40%',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...padding(5, 6, 5, 6),
    borderRadius: scaleSize(15),
    ...margin(2, 2, 2, 2),
  },
  label: {
    color: theme.white,
    textTransform: 'capitalize',
    width: '85%',
    overflow: 'hidden',
  },
});
