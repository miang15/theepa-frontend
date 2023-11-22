import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleSize,
  scaleWidth,
} from '../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  editbalance: {
    backgroundColor: theme.white,
    width: scaleWidth(340),
    alignSelf: 'center',
    ...padding(15, 15, 15, 15),
    borderRadius: 10,
  },
  balanceinput: {
    width: '95%',
    ...margin(20, 0, 3, 0),
  },
  crossmodal: {
    ...margin(0, 0, 10, 0),
    width: '100%',
  },
  error: {
    color: theme.red,
    ...margin(0, 10, 0, 10),
  },
  categoryview: {
    width: scaleWidth(70),
    alignItems: 'center',
    ...margin(1, 2, 1, 2),
  },
  category: {
    textTransform: 'capitalize',
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
  },
  popoverContent: {
    backgroundColor: 'white',
    padding: 10,
  },
  popoverArrow: {
    borderTopColor: 'white',
    borderTopWidth: 10,
  },
  logout: {
    ...margin(3, 20, 0, 20),
  },
  balancerow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...margin(20, 20, 15, 20),
    borderWidth: 2,
    ...padding(6, 20, 6, 20),
    minWidth: scaleWidth(300),
    maxWidth: scaleWidth(370),
    borderRadius: 20,
    borderColor: theme.primary,
    overflow: 'hidden',
  },
  balance: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: theme.sandbold,
    color: theme.primary,
    ...margin(0, 10, 0, 0),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...margin(20, 20, 5, 10),
    overflow: 'hidden',
  },
  expense: {
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    fontSize: scaleFont(14),
  },
  more: {
    color: theme.primary,
    textDecorationLine: 'underline',
    fontFamily: theme.sandregular,
  },
  expenselist: {
    alignSelf: 'center',
    flexGrow: 0,
  },
  incomemodal: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: scaleHeight(75),
    right: scaleSize(-5),
    width: scaleWidth(220),
  },
  content: {
    width: scaleWidth(300),
    height: 'auto',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.darkestgray,
    borderRadius: 20,
  },
  cross: {
    alignSelf: 'flex-end',
    ...margin(3, 5, 3, 0),
  },
  accountwrapper: {},
  wrapper: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: scaleHeight(30),
    right: scaleSize(15),
  },
  plusButton: {
    width: scaleSize(45),
    height: scaleSize(45),
    borderRadius: scaleSize(45),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gradientplus: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    position: 'absolute',
    bottom: scaleSize(50),
    right: scaleSize(15),
    alignSelf: 'flex-end',
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    ...margin(80, 0, 0, 0),
  },
  containerStyle2: {
    flex: 1,
    justifyContent: 'center',
    ...margin(200, 0, 0, 0),
  },
  modal: {
    backgroundColor: theme.white,
    alignSelf: 'center',
    ...margin(40, 0, 0, 0),
    width: scaleWidth(250),
    ...padding(10, 10, 10, 10),
    borderRadius: 10,
  },
  modal2: {
    backgroundColor: theme.white,
    alignSelf: 'center',
    ...margin(40, 0, 0, 0),
    width: scaleWidth(250),
    ...padding(10, 10, 10, 10),
    borderRadius: 10,
  },
  modal3: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    ...margin(0, 0, 0, 0),

    width: scaleWidth(380),
    flex: 1,
    backgroundColor: 'transparent',
    backfaceVisibility: 'hidden',
    ...padding(10, 10, 10, 10),
  },
  iconlist: {
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
    flexGrow: 0,
    ...margin(10, 0, 0, 0),
    maxHeight: scaleHeight(200),
  },
  iconview: {
    width: scaleSize(50),
    height: scaleSize(50),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: theme.darkestgray,
    padding: 8,
    ...margin(5, 8, 5, 8),
    borderRadius: 10,
  },
  img: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
  },

  close: {
    alignSelf: 'flex-end',
  },
  view: {
    textAlign: 'center',
    ...margin(10, 0, 0, 0),
    fontFamily: theme.sandregular,
  },
  addmore: {
    textAlign: 'center',
    color: theme.skyblue,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    ...margin(15, 0, 20, 0),
  },
  row3: {
    borderBottomWidth: 0.3,
    ...padding(8, 5, 8, 5),
  },
  option: {
    width: '80%',
  },
  icon: {
    ...margin(0, 0, 0, 10),
  },
  nodata: {
    alignSelf: 'center',
    ...margin(30, 0, 30, 0),
  },
});

export const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'transparent',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: 'transparent',
  },
  optionWrapper: {
    backgroundColor: 'transparent',
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
  },
};
