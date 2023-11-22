import {StyleSheet} from 'react-native';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleSize,
} from '../../utils/Layout';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    ...margin(7, 5, 7, 5),
  },
  heading: {
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    fontSize: scaleFont(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.darkestgray,
    ...padding(2, 10, 2, 5),
    borderRadius: 10,
    ...margin(3, 0, 0, 0),
  },
  input: {
    paddingVertical: 0,
    height: scaleHeight(40),
    width: '92%',
    color: theme.darkestgray,
    fontFamily: theme.sandsemibold,
  },
  imgview: {
    width: scaleSize(20.15),
    height: scaleSize(20),
    alignItems: 'center',
    overflow: 'hidden',
  },
});
