import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  signUp: {
    backgroundColor: theme.white,
    borderWidth: 2,
    borderColor: theme.black,
    width: theme.wp('65%'),
    marginTop: theme.hp('5%'),
  },
  error: {
    color: theme.red,
    marginHorizontal: theme.wp('5%'),
  },
  socialemail: {
    marginHorizontal: theme.wp('10%'),
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: theme.hp('10%'),
    marginBottom: theme.hp('2%'),
    fontWeight: 'bold',
    color: theme.black,
  },
});
