import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {margin, scaleWidth} from '../../../utils/Layout';

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
    marginHorizontal: theme.wp('8%'),
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
  forgotpassword: {
    color: theme.secondary,
    fontFamily: theme.sandsemibold,
    ...margin(10, 0, 0, 0),
    alignSelf: 'center',
    textAlign: 'center',
  },
  manual: {
    color: theme.secondary,
    fontFamily: theme.sandsemibold,
    textDecorationLine: 'underline',
  },
  emailfield: {
    marginTop: 20,
    width: scaleWidth(335),
  },
  passwordfield: {
    width: scaleWidth(335),
  },
  signin: {
    color: theme.darkestgray,
    alignSelf: 'center',
    ...margin(20, 0, 20, 0),
    fontFamily: theme.sandregular,
  },
});
