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
    ...margin(10, 20, 0, 20),
  },
  goals: {
    // alignSelf: 'flex-start',
    ...margin(5, 0, 5, 0),
  },
  input: {
    alignSelf: 'flex-start',
    ...margin(20, 20, 0, 20),
  },
  category: {
    ...margin(15, 20, 10, 20),
  },
  noteslabel: {
    ...margin(5, 15, 0, 20),
    fontFamily: theme.sandregular,
    fontSize: scaleFont(16),
  },
  notes: {
    paddingVertical: 0,
    ...margin(5, 20, 10, 20),
    borderWidth: 1,
    borderColor: theme.darkestgray,
    borderRadius: 10,
    ...padding(10, 10, 10, 10),
    color: theme.black,
  },
  row: {
    flexDirection: 'row',
    ...margin(10, 20, 10, 15),
    overflow: 'hidden',
    width: '90%',
  },
  add: {
    ...margin(15, 0, 15, 0),
  },
  label: {
    color: theme.white,
    fontWeight: 'bold',
  },
  error: {
    color: theme.red,
    ...margin(3, 10, 0, 20),
  },
});
