import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {
  margin,
  padding,
  scaleHeight,
  scaleSize,
  scaleWidth,
} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  nodata: {
    color: theme.darkestgray,
    textAlign: 'center',
    fontFamily: theme.sandregular,
    ...margin(50, 0, 50, 0),
  },
  headview: {
    backgroundColor: theme.lightgray,
    borderWidth: 2,
    borderColor: theme.skyblue,
    borderRadius: 5,
    width: scaleWidth(360),
    alignSelf: 'center',
    ...margin(20, 0, 0, 0),
    overflow: 'hidden',
    ...padding(10, 10, 10, 10),
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balance: {
    textAlign: 'center',
    alignSelf: 'center',
    ...margin(20, 20, 15, 20),
    borderWidth: 2,
    ...padding(6, 20, 6, 20),
    minWidth: scaleWidth(300),
    maxWidth: scaleWidth(350),
    borderRadius: 20,
    borderColor: theme.primary,
    fontFamily: theme.sandbold,
    color: theme.primary,
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
  delete: {
    width: scaleSize(18),
    height: scaleSize(21),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    ...theme.img,
    tintColor: theme.darkestgray,
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
    width: '75%',
    overflow: 'hidden',
  },
  column: {
    width: '78%',
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
  modal: {
    backgroundColor: theme.white,
    alignSelf: 'center',
    width: scaleWidth(350),
    borderRadius: 10,
    ...padding(20, 20, 20, 20),
  },
  heading: {
    ...margin(0, 0, 10, 0),
    alignSelf: 'flex-start',
    width: '100%',
  },
  desc: {
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
  },
  deleteview: {
    ...margin(30, 0, 0, 0),
    width: '60%',
  },
  modalrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...margin(30, 0, 0, 0),
  },
  cancel: {
    width: '45%',
  },
});
