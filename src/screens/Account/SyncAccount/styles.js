import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleSize,
} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  close: {
    ...margin(10, 0, 10, 10),
  },
  desc: {
    ...margin(10, 20, 5, 20),
    color: theme.primary,
    fontFamily: theme.sandbold,
    fontSize: scaleFont(22),
  },
  accounts: {
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    ...margin(0, 20, 0, 20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...margin(5, 0, 5, 0),
  },
  list: {
    flexGrow: 0,
    ...margin(10, 20, 20, 20),
    height: scaleHeight(450),
  },
  banknames: {
    fontFamily: theme.sandsemibold,
    color: theme.darkestgray,
    alignSelf: 'flex-end',
    textAlign: 'left',
    ...margin(0, 5, 3, 5),
  },
  bankimg: {
    width: scaleSize(50),
    height: scaleHeight(50),
    overflow: 'hidden',
    alignItems: 'center',
    ...padding(5, 5, 5, 5),
    backgroundColor: theme.offwhite,
    borderRadius: 10,
  },
  innerrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
    overflow: 'hidden',
  },
  column: {
    width: '80%',
  },
  amount: {
    color: theme.primary,
    fontFamily: theme.sandsemibold,
  },
  bankname: {
    color: theme.darkestgray,
    fontFamily: theme.sandsemibold,
  },
  accountID: {
    color: theme.lightgrey,
    fontFamily: theme.sandregular,
  },
});
