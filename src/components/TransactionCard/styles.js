import {StyleSheet} from 'react-native';
import {
  margin,
  padding,
  scaleHeight,
  scaleSize,
  scaleWidth,
} from '../../utils/Layout';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  row1: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...margin(5, 0, 10, 0),
    ...padding(0, 5, 5, 5),
    borderBottomWidth: 0.3,
    borderColor: theme.darkestgray,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    ...margin(0, 0, 5, 0),
    width: '100%',
  },
  innerrow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    overflow: 'hidden',
  },
  imgview: {
    width: scaleSize(35),
    height: scaleSize(35),
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: theme.secondary,
  },
  column: {
    width: '80%',
    overflow: 'hidden',
    alignItems: 'flex-start',
    ...margin(0, 0, 0, 10),
  },
  category: {
    color: theme.darkestgray,
    fontFamily: theme.sandsemibold,
    width: '95%',
    textTransform: 'capitalize',
  },
  bank: {
    width: '95%',
    color: theme.lightgrey,
    fontFamily: theme.sandregular,
  },
  value: {
    width: '95%',
    color: theme.lightgrey,
    fontFamily: theme.sandregular,
  },
  amount: {
    color: theme.secondarylight,
    fontFamily: theme.sandsemibold,
    width: '38%',
    textAlign: 'right',
    height: scaleHeight(25),
  },
});
