import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  input: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: theme.white,
    color: theme.black,
    fontSize: theme.hp('2%'),
    marginHorizontal: theme.wp('3%'),
    marginVertical: theme.hp('1%'),
  },
});
