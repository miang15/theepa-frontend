import {StyleSheet} from 'react-native';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleSize,
  scaleWidth,
} from '../../../../utils/Layout';
import theme from '../../../../utils/theme';

export const styles = StyleSheet.create({
  slide3: {
    flex: 1,
    backgroundColor: theme.white,
  },
  name: {
    fontSize: scaleFont(13),
  },
  add: {
    ...margin(30, 0, 0, 0),
  },
  heading: {
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    ...margin(0, 20, 0, 20),
  },
  goal: {
    alignSelf: 'flex-start',
    ...margin(30, 20, 0, 20),
  },

  error2: {
    color: theme.red,
    ...margin(3, 20, 0, 20),
  },
  categorydropdown: {
    ...margin(20, 20, 10, 20),
    width: scaleWidth(180),
    alignSelf: 'flex-start',
  },
  daterow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...margin(0, 20, 0, 20),
  },
  startdate: {
    width: '45%',
    borderWidth: 1,
    borderColor: theme.black,
    backgroundColor: theme.white,
  },
  empty: {
    width: '5%',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...margin(10, 0, 25, 0),
    ...padding(0, 10, 0, 10),
  },
  screen: {
    maxWidth: '80%',
    alignSelf: 'center',
    fontFamily: theme.montbold,
  },
  category: {
    ...margin(0, 20, 10, 20),
    fontFamily: theme.sandregular,
    fontSize: scaleFont(15),
  },
  flatlist: {
    maxHeight: scaleHeight(160),
    overflow: 'hidden',
    flexGrow: 0,
    alignSelf: 'center',
  },
  categoryview: {
    width: scaleWidth(70),
    height: scaleHeight(70),
    alignItems: 'center',
    ...margin(0, 3, 5, 3),
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
  imgicon: {
    ...theme.img,
    tintColor: theme.secondary,
  },
});
