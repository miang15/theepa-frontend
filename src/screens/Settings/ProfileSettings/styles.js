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
  container2: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...padding(10, 15, 5, 5),
  },
  imgview: {
    width: scaleSize(70),
    height: scaleSize(70),
    overflow: 'hidden',

    borderWidth: 1,
    borderRadius: scaleSize(100),
    ...margin(30, 0, 0, 15),
  },
  input: {
    ...margin(25, 0, 0, 5),
    paddingVertical: 0,
    fontSize: 20,
    fontFamily: theme.sandregular,
    color: theme.darkestgray,
  },
  label: {
    ...margin(30, 10, 0, 15),
  },
  email: {
    ...margin(0, 10, 0, 15),
    maxWidth: scaleWidth(350),
    fontFamily: theme.montbold,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...margin(20, 10, 20, 10),
  },
  sync: {
    fontFamily: theme.sandbold,
    color: theme.primary,
  },
  update: {
    backgroundColor: theme.skyblue,
    borderColor: theme.skyblue,
    ...margin(100, 0, 0, 0),
  },
  text: {
    color: theme.white,
    fontFamily: theme.montbold,
  },
  settingstitle: {
    fontSize: 30,
    fontFamily: theme.sandbold,
    color: theme.primary,
    ...margin(40, 0, 0, 20),
  },
  editicon: {
    ...margin(50, 0, 0, 10),
  },
});
