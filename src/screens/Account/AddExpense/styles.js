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
  heading: {
    color: theme.primary,
    fontFamily: theme.sandbold,
    fontSize: scaleFont(22),
    textTransform: 'capitalize',
    ...margin(10, 20, 5, 20),
  },
  cross: {
    ...margin(10, 15, 20, 10),
  },
  account: {
    ...margin(10, 0, 0, 0),
  },
  goals: {
    width: scaleWidth(200),
    alignSelf: 'flex-start',
    ...margin(25, 20, 0, 20),
  },
  input: {
    alignSelf: 'flex-start',
    ...margin(20, 20, 0, 20),
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
  imgicon: {
    ...theme.img,
    tintColor: theme.secondary,
  },
  emoji: {},
  viewmore: {
    ...margin(0, 20, 5, 20),
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    textDecorationLine: 'underline',
  },
  category: {
    ...margin(10, 20, 10, 20),
    fontFamily: theme.sandregular,
    fontSize: scaleFont(15),
  },
  date: {
    alignSelf: 'flex-start',
    ...margin(25, 20, 10, 20),
    width: scaleWidth(130),
  },
  notes: {
    paddingVertical: 0,
    ...margin(10, 20, 10, 20),
    borderWidth: 0.5,
    borderColor: theme.black,
    borderRadius: 10,
    ...padding(10, 10, 10, 10),
    color: theme.black,
  },
  row: {
    flexDirection: 'row',
    ...margin(35, 20, 10, 15),
  },
  add: {
    ...margin(30, 0, 10, 0),
  },
  label: {
    color: theme.white,
    fontWeight: 'bold',
  },
  error: {
    color: theme.red,
    ...margin(3, 10, 0, 20),
  },
  categoryview: {
    width: scaleWidth(70),
    height: scaleHeight(70),
    alignItems: 'center',
    ...margin(0, 3, 5, 3),
  },
  imgView: {
    width: scaleSize(50),
    height: scaleSize(50),
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...padding(5, 5, 5, 5),
    justifyContent: 'center',
    ...margin(0, 0, 5, 0),
    borderWidth: 1,
    borderRadius: 10,
  },
  img: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
  },
  name: {
    maxWidth: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
    fontSize: scaleFont(13),
  },
  containerStyle: {
    backgroundColor: theme.white,
    width: scaleWidth(370),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  modalView: {
    justifyContent: 'flex-start',
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
  modalcross: {
    alignSelf: 'flex-end',
  },
  setcategory: {
    ...margin(50, 0, 0, 0),
  },
  emoji: {
    fontSize: scaleFont(22),
  },
  emojiview: {
    width: scaleSize(50),
    height: scaleSize(50),
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
    ...margin(0, 0, 5, 0),
    justifyContent: 'center',
  },
  flatlist: {
    maxHeight: scaleHeight(160),
    overflow: 'hidden',
    flexGrow: 0,
    alignSelf: 'center',
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
