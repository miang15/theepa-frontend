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
    marginHorizontal: theme.wp('10%'),
  },
  socialemail: {
    marginHorizontal: theme.wp('10%'),
    marginTop: theme.hp('10%'),
    marginBottom: theme.hp('2%'),
    fontWeight: 'bold',
    color: theme.black,
  },
  otpcontainer: {
    height: theme.hp('8%'),
    width: theme.wp('85%'),
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: theme.hp('2%'),
  },
  box: {
    borderColor: theme.secondary,
    borderRadius: 8,
    fontSize: theme.hp('2.5%'),
    color: theme.black,
  },
  highLighted: {
    borderColor: theme.skyblue,
    borderWidth: 1,
    fontSize: theme.hp('2.5%'),
    color: theme.black,
  },
});
