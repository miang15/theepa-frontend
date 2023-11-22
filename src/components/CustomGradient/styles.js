import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {margin, padding, scaleFont, scaleHeight} from '../../utils/Layout';

export const styles = StyleSheet.create({
  topview: {
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 20,
    ...margin(5, 5, 5, 5),
  },
  gradient: {
    width: '100%',
    overflow: 'hidden',
    ...padding(10, 5, 10, 5),
    borderRadius: 20,
  },
  title: {
    color: theme.white,
    maxWidth: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: theme.sandmedium,
    fontSize: scaleFont(18),
  },
});
