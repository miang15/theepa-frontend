import {StyleSheet} from 'react-native';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/Layout';
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
    width: '90%',
    color: theme.primary,
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
  },
  chartrow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scaleWidth(340),
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    ...margin(0, 10, 5, 10),
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 5,
  },
  label: {
    width: '80%',
    overflow: 'hidden',
    textTransform: 'uppercase',
    fontSize: scaleFont(13),
  },
  nodata: {
    alignSelf: 'center',
    ...margin(20, 0, 20, 0),
  },
  donut: {
    width: scaleWidth(185),
    height: scaleHeight(190),
    alignSelf: 'center',
    ...margin(5, 0, 5, 5),
  },
});

export const optionsStyles = {
  optionsContainer: {
    padding: 5,
    maxHeight: scaleHeight(300),
  },
};
