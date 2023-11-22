import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleSize,
  scaleWidth,
} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  content: {
    width: scaleWidth(250),
    height: 'auto',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.darkestgray,
    borderRadius: 20,
  },
  desc: {
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    textAlign: 'center',
    ...margin(10, 0, 10, 0),
    fontSize: scaleFont(15),
  },
  iconlist: {
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
    flexGrow: 0,
    maxHeight: scaleHeight(120),
  },
  selecticon: {
    ...margin(5, 20, 0, 20),
    fontFamily: theme.sandregular,
    color: theme.darkestgray,
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
    ...theme.img,
    tintColor: theme.secondary,
  },
  emoji: {
    fontSize: scaleFont(22),
  },
  viewmore: {
    ...margin(0, 20, 5, 20),
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expenselist: {
    ...margin(20, 0, 20, 0),
    alignSelf: 'center',
    maxHeight: scaleHeight(365),
    // flexGrow: 0,
  },
  label: {
    color: theme.black,
  },
  btn: {
    ...margin(10, 0, 15, 0),
  },
  containerStyle: {
    backgroundColor: theme.white,
    width: scaleWidth(370),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    paddingVertical: 10,
    paddingBottom: 0,
  },
  modalView: {
    justifyContent: 'center',
    ...margin(20, 0, 0, 0),
  },
  modalrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    width: '70%',
    paddingRight: 5,
    paddingTop: 5,
  },
  modalinput: {
    ...margin(20, 0, 10, 0),
  },
  selectview: {
    ...margin(20, 20, 0, 20),
  },
  emojiModal: {
    flex: 1,
    backgroundColor: theme.white,
    paddingHorizontal: scaleWidth(20),
  },
  cross: {
    alignSelf: 'flex-end',
  },
  setcategory: {
    ...margin(30, 0, 20, 0),
    width: '50%',
  },
  error: {
    color: theme.red,
    ...margin(3, 20, 0, 20),
  },
  category: {
    textAlign: 'left',
    fontFamily: theme.sandbold,
    ...margin(30, 0, 0, 20),
    fontSize: scaleFont(20),
    color: theme.primary,
  },
  containerStyle2: {
    flex: 1,
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: theme.white,
    alignSelf: 'center',
    ...margin(40, 0, 0, 0),
    width: scaleWidth(250),
    ...padding(10, 10, 10, 10),
    borderRadius: 10,
    overflow: 'hidden',
  },
  close: {
    alignSelf: 'flex-end',
  },
  view: {
    textAlign: 'center',
    ...margin(10, 0, 0, 0),
  },
  view2: {
    textAlign: 'center',
    ...margin(10, 0, 0, 0),
    fontFamily: theme.sandregular,
  },
  setnow: {
    width: '50%',
    ...margin(20, 0, 10, 0),
  },
  vendorlist: {
    height: scaleHeight(400),
    flexGrow: 0,
    ...margin(15, 10, 10, 15),
    ...padding(5, 5, 5, 5),
  },
  done: {
    width: scaleWidth(150),
    ...margin(25, 0, 0, 0),
  },
  vendordesc: {
    alignSelf: 'center',
    textAlign: 'center',
    ...margin(5, 10, 5, 10),
  },
  vendorView: {
    justifyContent: 'flex-start',
    ...margin(10, 0, 10, 0),
  },
  vendorclose: {
    alignSelf: 'flex-end',
    ...margin(0, 10, 10, 10),
  },
  vendorContainer: {
    flex: 1,
    backgroundColor: theme.white,
    width: scaleWidth(370),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  vendorrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendors: {
    alignSelf: 'flex-start',
    width: scaleWidth(200),
    ...margin(20, 10, 0, 20),
  },
});
