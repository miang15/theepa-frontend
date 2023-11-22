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
    width: '90%',
    color: theme.primary,
    fontFamily: theme.sandbold,
  },
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    maxWidth: '70%',
  },
  accountsrow3: {
    flexDirection: 'row',
    alignItems: 'center',
    ...margin(0, 0, 0, 20),
  },
  chart: {
    width: scaleWidth(340),
    overflow: 'hidden',
    ...padding(15, 55, 0, 0),
    ...margin(5, 0, 5, 0),
    borderRadius: 10,
  },
});

export const optionsStyles = {
  optionsContainer: {
    padding: 5,
    maxHeight: scaleHeight(300),
  },
};
