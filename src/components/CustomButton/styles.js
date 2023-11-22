import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  google: {
    borderRadius: 8,
    width: theme.wp('70%'),
    backgroundColor: theme.white,
    marginVertical: theme.hp('2%'),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: theme.black,
  },
  googlelabel: {
    color: theme.black,
    fontSize: theme.hp('2%'),
  },
});
