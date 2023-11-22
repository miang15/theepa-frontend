import {StyleSheet} from 'react-native';
import {margin, padding, scaleSize, scaleWidth} from '../../utils/Layout';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '99%',
    overflow: 'hidden',

    ...padding(0, 0, 5, 0),
    ...margin(10, 0, 0, 0),
  },
  imgview: {
    width: scaleSize(35),
    height: scaleSize(35),
    alignItems: 'center',
    overflow: 'hidden',
    ...margin(0, 0, 0, 5),
  },
  column: {
    width: '87%',
  },
  label: {
    fontFamily: theme.sandbold,
    color: theme.primary,
    textTransform: 'capitalize',
  },
});
