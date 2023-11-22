import {StyleSheet} from 'react-native';
import {margin, scaleSize} from '../../utils/Layout';

export const styles = StyleSheet.create({
  arrow: {
    width: scaleSize(20.4),
    height: scaleSize(30),
    alignItems: 'center',
    overflow: 'hidden',
    ...margin(15, 15, 10, 15),
    justifyContent: 'center',
    padding: 4,
  },
  back: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
});
