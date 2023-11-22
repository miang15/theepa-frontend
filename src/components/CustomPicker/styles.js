import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {margin, scaleFont, scaleHeight, scaleSize} from '../../utils/Layout';

export const styles = StyleSheet.create({
  topview: {
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
    ...margin(3, 0, 5, 0),
  },
  placeholderStyle: {
    color: theme.darkestgray,
    opacity: 0.3,
  },
  label: {
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    fontSize: scaleFont(16),
  },
  listItemLabelStyle: {
    textTransform: 'capitalize',
    color: theme.black,
    fontFamily: theme.montregular,
  },
  containerview: {
    alignSelf: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: theme.darkestgray,
    borderRadius: 10,
    height: scaleHeight(50),
    overflow: 'hidden',
  },
  dropdown: {
    borderWidth: 0,
  },
  dropdowncontainer: {
    borderColor: theme.gray,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: theme.white,
    ...margin(5, 0, 0, 0),
    zIndex: 1,
  },
  imgview: {
    width: scaleSize(15.15),
    height: scaleSize(9),
    alignItems: 'center',
    overflow: 'hidden',
  },
});
