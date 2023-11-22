import {StyleSheet} from 'react-native';
import {margin, scaleFont} from '../../utils/Layout';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
    ...margin(15, 0, 5, 0),
  },
  heading: {
    color: theme.primary,
    fontFamily: theme.sandbold,
    fontSize: scaleFont(22),
    textTransform: 'capitalize',
  },
});
