import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleSize,
  scaleWidth,
} from '../../utils/Layout';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.offwhite,
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: scaleWidth(115),
    height: scaleHeight(115),
    overflow: 'hidden',
    ...padding(5, 5, 5, 5),
    borderRadius: 15,
    ...margin(3, 5, 3, 5),
    borderWidth: 1,
  },
  imgView: {
    width: '25%',
    height: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    tintColor: theme.primary,
  },
  category: {
    color: theme.secondary,
    textTransform: 'capitalize',
    fontFamily: theme.sandsemibold,
    fontSize: scaleFont(13),
  },
  price: {
    color: theme.secondary,
    fontFamily: theme.sandsemibold,
    fontSize: scaleFont(13),
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
  },
  budget: {
    color: theme.primary,
    fontFamily: theme.sandsemibold,
    fontSize: scaleFont(13),
  },
  progress: {
    width: scaleWidth(100),
    height: scaleHeight(10),
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.secondary,
    ...margin(5, 0, 0, 0),
    borderRadius: 10,
    overflow: 'hidden',
  },
  emoji: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});
