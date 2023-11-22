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
    ...padding(10, 0, 0, 0),
  },
  emoji: {
    fontSize: scaleFont(22),
  },
  close: {
    ...margin(10, 10, 10, 10),
  },
  syncbutton: {
    alignSelf: 'center',
    width: scaleWidth(350),
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    ...margin(40, 20, 10, 20),
    ...padding(1.5, 1.5, 1.5, 1.5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.white,
    justifyContent: 'center',
    ...padding(10, 0, 10, 0),
    overflow: 'hidden',
    borderRadius: 20,
  },
  sync: {
    ...margin(0, 0, 3, 10),
    color: theme.primary,
    fontFamily: theme.sandsemibold,
  },
  input: {
    ...margin(10, 0, 0, 0),
  },
  error: {
    color: theme.red,
    ...margin(5, 20, 0, 20),
  },
  selectview: {
    ...margin(20, 20, 0, 20),
  },
  emojiModal: {
    flex: 1,
    backgroundColor: theme.white,
    paddingHorizontal: scaleWidth(20),
  },
  syncmodal: {
    flex: 1,
    backgroundColor: theme.white,
  },
  cross: {
    alignSelf: 'flex-end',
  },
  label: {
    color: theme.black,
  },
  btn: {
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.black,
    ...margin(50, 0, 10, 0),
  },
  desc: {
    alignSelf: 'center',
    textAlign: 'center',
    ...margin(10, 20, 10, 20),
  },
  modalrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    flexGrow: 0,
    ...margin(10, 20, 5, 20),
    borderWidth: 1,
    borderRadius: 10,
    maxHeight: scaleHeight(300),
    minHeight: scaleHeight(150),
  },
  iconlist: {
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
    flexGrow: 0,
    maxHeight: scaleHeight(180),
    borderWidth: 0.3,
    borderRadius: scaleSize(5),
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
  },
  viewmore: {
    ...margin(0, 20, 5, 20),
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    textDecorationLine: 'underline',
  },
});
