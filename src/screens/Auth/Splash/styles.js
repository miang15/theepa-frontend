import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {
  scaleSize,
  padding,
  margin,
  scaleWidth,
  scaleFont,
  scaleHeight,
} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: scaleSize(100),
    height: scaleSize(100),
  },
  theepa: {
    color: theme.white,
    fontFamily: theme.sandbold,
    textAlign: 'center',
    fontSize: scaleFont(40),
  },
  modal: {
    backgroundColor: theme.white,
    width: scaleWidth(320),
    alignSelf: 'center',
    ...padding(15, 15, 15, 15),
    borderRadius: 10,
  },
  cross: {
    ...margin(0, 0, 10, 0),
    width: '100%',
  },
  desc: {
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    ...margin(0, 0, 20, 0),
  },
  description: {
    color: theme.white,
    position: 'absolute',
    bottom: scaleHeight(30),
  },
  terms: {
    color: theme.primary,
  },
});
