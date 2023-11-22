import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  heading: {
    alignSelf: 'center',
    fontFamily: theme.montbold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...margin(20, 15, 5, 15),
  },
  innerrow: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: scaleWidth(350),
    overflow: 'hidden',
  },
  category: {
    maxWidth: '90%',
    ...margin(0, 10, 0, 0),
  },
  budget: {
    ...margin(20, 25, 5, 25),
    color: theme.primary,
    fontFamily: theme.sandbold,
    fontSize: scaleFont(20),
  },
  transaction: {
    ...margin(30, 25, 15, 25),
    color: theme.primary,
    fontFamily: theme.sandbold,
    fontSize: scaleFont(20),
  },
  history: {
    maxHeight: scaleHeight(300),
    ...padding(5, 0, 5, 0),
    overflow: 'hidden',
    flexGrow: 0,
  },
  delete: {
    alignSelf: 'center',
    ...margin(30, 0, 5, 0),
  },
  modal: {
    backgroundColor: theme.white,
    width: scaleWidth(320),
    alignSelf: 'center',
    ...padding(15, 15, 15, 15),
    borderRadius: 10,
  },
  cross: {
    ...margin(0, 0, 10, 0),
    width: '100%',
  },
  desc: {
    color: theme.darkestgray,
    fontFamily: theme.sandregular,
    ...margin(0, 0, 20, 0),
  },
  btnrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...margin(20, 0, 0, 0),
  },
  btn1: {
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.black,
    width: '45%',
  },
  label: {
    color: theme.black,
  },
  input: {
    paddingVertical: 0,
    height: scaleHeight(45),
    maxWidth: scaleWidth(300),
    color: theme.primary,
    fontFamily: theme.sandbold,
    ...margin(0, 15, 0, 10),

    textTransform: 'capitalize',
    fontSize: scaleFont(22),
  },
  input2: {
    paddingVertical: 0,
    // height: scaleHeight(45),
    maxWidth: scaleWidth(300),
    color: theme.primary,
    fontFamily: theme.sandbold,
    ...margin(0, 15, 0, 10),
    textTransform: 'capitalize',
    fontSize: scaleFont(22),
    justifyContent: 'center',
  },
  nodata: {
    textAlign: 'center',
    fontFamily: theme.montbold,
    ...margin(20, 0, 20, 0),
  },
  option: {
    maxWidth: '70%',
  },
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const optionsStyles = {
  optionsContainer: {
    padding: 5,
    maxHeight: scaleHeight(300),
  },
};
