import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {margin, padding, scaleFont, scaleHeight} from '../../utils/Layout';

export const styles = StyleSheet.create({
  topview: {
    width: '85%',
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 20,
    ...margin(5, 0, 5, 0),
  },
  gradient: {
    width: '100%',
    overflow: 'hidden',
    ...padding(12, 0, 10, 0),
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: theme.white,
    maxWidth: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: theme.sandmedium,
    fontSize: scaleFont(15),
  },
});
