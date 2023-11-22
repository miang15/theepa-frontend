import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {margin, padding, scaleFont, scaleHeight} from '../../utils/Layout';

export const styles = StyleSheet.create({
  topview: {
    width: '95%',
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 20,
    ...margin(5, 5, 5, 5),
    border: 1,
    ...padding(1.5, 1.5, 1.5, 1.5),
  },
  gradient: {
    width: '100%',
    overflow: 'hidden',
    ...padding(8, 5, 8, 5),
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    color: theme.primary,
    maxWidth: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: theme.sandmedium,
    fontSize: scaleFont(18),

    width: '85%',
  },
});
