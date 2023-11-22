import {StyleSheet} from 'react-native';
import theme from '../../../../utils/theme';
import {
  margin,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  innerrow: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: scaleWidth(350),
    overflow: 'hidden',
    ...margin(0, 20, 0, 20),
  },
  input: {
    paddingVertical: 0,
    height: scaleHeight(40),
    maxWidth: scaleWidth(300),
    color: theme.primary,
    fontFamily: theme.sandbold,
    ...margin(0, 15, 0, 0),
    fontSize: scaleFont(30),
  },
  input2: {
    paddingVertical: 0,
    // height: scaleHeight(45),
    maxWidth: scaleWidth(300),
    color: theme.primary,
    fontFamily: theme.sandbold,
    ...margin(0, 15, 0, 0),
    textTransform: 'capitalize',
    fontSize: scaleFont(30),
    justifyContent: 'center',
  },
  buttons: {
    ...margin(80, 0, 10, 0),
  },
});
