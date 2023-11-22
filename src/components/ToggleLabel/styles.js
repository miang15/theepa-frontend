import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {margin} from '../../utils/Layout';

export const styles = StyleSheet.create({
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...margin(20, 10, 20, 10),
    width: '95%',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  sync: {
    fontFamily: theme.sandbold,
    color: theme.darkestgray,
    width: '85%',
  },
});
