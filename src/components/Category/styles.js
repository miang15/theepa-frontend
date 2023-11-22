import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {scaleHeight, margin, scaleSize, padding} from '../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    width: '45%',
    ...margin(5, 5, 5, 5),
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.darkestgray,
    ...padding(5, 10, 5, 10),
    borderRadius: 10,
  },

  imgView: {
    width: scaleSize(30),
    height: scaleSize(30),
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
  },
  img: {
    ...theme.img,
    tintColor: theme.secondary,
  },
  emoji: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  name: {
    textTransform: 'capitalize',
    ...margin(0, 10, 0, 10),
    fontFamily: theme.sandmedium,
    width: '75%',
  },
});
