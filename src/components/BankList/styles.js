import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {margin, padding, scaleHeight, scaleSize} from '../../utils/Layout';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    justifyContent: 'space-between',
    marginVertical: theme.hp('0.3%'),
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    overflow: 'hidden',
  },
  bankview: {
    width: scaleSize(50),
    height: scaleHeight(50),
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...padding(5, 5, 5, 5),
    backgroundColor: theme.offwhite,
    borderRadius: 10,
  },
  bank: {
    ...margin(0, 6, 0, 0),
    color: theme.black,
    padding: 0,
    width: '100%',
    paddingVertical: 0,
    height: scaleHeight(20),
  },
  unsync: {
    ...margin(0, 5, 0, 15),
    color: theme.skyblue,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  num: {
    color: theme.lightgrey,
    fontFamily: theme.sandregular,
    ...margin(0, 0, 0, 0),
  },
  inputrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
    overflow: 'hidden',
    ...margin(0, 0, 0, 5),
  },
  column1: {
    maxWidth: '90%',
    overflow: 'hidden',
    alignItems: 'flex-start',
    ...margin(0, 10, 0, 0),
  },
  edit: {
    width: scaleSize(20),
    height: scaleSize(20),
    alignItems: 'center',
    overflow: 'hidden',
  },
});
