import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {
  margin,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingHorizontal: scaleWidth(25),
    paddingTop: scaleHeight(5),
  },
  facebook: {
    backgroundColor: theme.blue,
    ...margin(10, 0, 30, 0),
  },
  manual: {
    color: theme.secondary,
    fontFamily: theme.sandsemibold,
    textDecorationLine: 'underline',
  },
  text: {color: theme.black, alignSelf: 'center'},
  signin: {
    color: theme.darkestgray,
    alignSelf: 'center',
    ...margin(10, 0, 0, 0),
    fontFamily: theme.sandregular,
  },

  version: {
    alignSelf: 'flex-end',
  },
  google: {
    ...margin(20, 0, 10, 0),
    backgroundColor: theme.red,
  },
  signuptext: {
    fontSize: scaleFont(19.5),
    fontFamily: theme.sandbold,
    color: theme.primary,
    ...margin(5, 0, 0, 0),
  },
  namefield: {
    ...margin(10, 0, 5, 0),
    width: scaleWidth(335),
  },
  emailfield: {
    width: scaleWidth(335),
  },
  passwordfield: {
    width: scaleWidth(335),
  },
  createaccbtn: {
    ...margin(15, 0, 0, 0),
    width: scaleWidth(335),
  },
  line: {
    borderWidth: 0.5,
    borderColor: theme.darkestgray,
    width: scaleWidth(150),
    height: 0,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    ...margin(20, 0, 0, 0),
  },
  error: {
    color: theme.red,
    ...margin(0, 20, 0, 5),
  },
});
