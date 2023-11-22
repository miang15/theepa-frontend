import {StyleSheet} from 'react-native';
import {margin, padding, scaleWidth} from '../../../../utils/Layout';
import theme from '../../../../utils/theme';

export const styles = StyleSheet.create({
  slide3: {
    flex: 1,
    backgroundColor: theme.white,
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
  goalamount: {
    alignSelf: 'flex-start',
    ...margin(20, 20, 0, 20),
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
});
