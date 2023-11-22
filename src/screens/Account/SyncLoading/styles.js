import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {margin, scaleFont, scaleHeight, scaleSize} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
  heading: {
    color: theme.primary,
    fontFamily: theme.sandbold,
    fontSize: scaleFont(20),
    textAlign: 'center',
    ...margin(15, 20, 5, 20),
  },
  desc: {
    color: theme.lightgrey,
    fontFamily: theme.sandregular,
    textAlign: 'center',
    ...margin(0, 20, 5, 20),
    fontSize: scaleFont(14),
  },
  proceed: {
    position: 'absolute',
    bottom: scaleHeight(15),
  },
});
