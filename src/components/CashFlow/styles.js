import {StyleSheet} from 'react-native';
import {margin, padding, scaleHeight, scaleWidth} from '../../utils/Layout';
import theme from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: scaleWidth(360),
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 8,
    ...margin(10, 0, 10, 0),
    ...padding(8, 10, 10, 10),
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: theme.primary,
    width: '90%',
    fontFamily: theme.sandbold,
  },
  centerview: {
    width: scaleWidth(335),
    ...margin(5, 0, 0, 0),
  },
  expenseview: {
    width: scaleWidth(335),
    ...margin(15, 0, 0, 0),
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scaleWidth(335),
  },
  income: {
    maxWidth: '70%',
    ...margin(0, 5, 0, 0),
  },
  incomevalue: {
    maxWidth: '30%',
  },
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountsrow3: {
    flexDirection: 'row',
    alignItems: 'center',
    ...margin(0, 0, 0, 20),
  },
  option: {
    maxWidth: '70%',
    textTransform: 'capitalize',
  },
});

export const optionsStyles = {
  optionsContainer: {
    padding: 5,
    maxHeight: scaleHeight(300),
  },
};
