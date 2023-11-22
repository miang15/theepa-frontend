import {StyleSheet} from 'react-native';
import {scaleFont, margin, scaleWidth} from '../../utils/Layout';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  desc: {
    textAlign: 'center',
    fontSize: scaleFont(15),
    ...margin(5, 3, 3, 3),
    maxWidth: scaleWidth(300),
    alignSelf: 'center',
  },
  terms: {
    color: theme.secondary,
    fontWeight: 'bold',
  },
});
