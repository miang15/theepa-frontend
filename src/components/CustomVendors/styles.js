import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleSize,
} from '../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
    ...margin(5, 0, 5, 0),
  },
  heading: {
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    fontSize: scaleFont(16),
  },
  row1: {
    borderWidth: 0.5,
    borderColor: theme.darkestgray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...padding(8, 7, 8, 7),
    borderRadius: 8,
    width: '100%',
  },
  innerrow: {
    width: '90%',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countview: {
    backgroundColor: theme.secondary,
    width: scaleSize(30),
    height: scaleSize(30),
    borderRadius: scaleSize(30),
    ...padding(1, 1, 1, 1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    color: theme.white,
    textAlign: 'center',
    alignSelf: 'center',
  },
  column: {
    borderWidth: 0.5,
    borderColor: theme.darkestgray,
    overflow: 'hidden',
    ...padding(8, 7, 8, 7),
    borderRadius: 8,
    width: '100%',
  },
  selectedlist: {
    width: '90%',
    alignSelf: 'flex-start',
    maxHeight: scaleHeight(125),
    ...padding(5, 0, 5, 0),
    overflow: 'hidden',
    borderBottomWidth: 0.3,
    borderColor: theme.darkestgray,
  },
  vendorlist: {
    maxHeight: scaleHeight(120),
    ...margin(5, 0, 5, 0),
  },
  vendorrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '49%',
    overflow: 'hidden',
  },
  vendorItem: {
    width: '80%',
    overflow: 'hidden',
    textTransform: 'capitalize',
    fontSize: scaleFont(14),
    color: theme.darkestgray,
  },
});
