import {TouchableOpacity, Text, View, Image} from 'react-native';
import React from 'react';
import Images from '../../constants/Images';
import {styles} from './styles';
import CustomText from '../CustomText/CustomText';
import {margin, scaleHeight, scaleWidth} from '../../utils/Layout';
import theme from '../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';

const CategoryCard = ({
  Icon,
  category,
  emoji,
  onPress,
  spent,
  budget,
  progress,
}) => {
  const gradientColors = theme.gradientcolors;
  const alertThreshold = 0.8; // Set the threshold value for the alert color

  let colors = gradientColors;
  if (progress > alertThreshold) {
    colors = theme.alertgradient;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={theme.opacity}
      style={{
        ...styles.card,
        borderColor: progress > alertThreshold ? 'red' : theme.offwhite,
        justifyContent: category == 'Income' ? 'center' : null,
      }}>
      <CustomText style={styles.category} numberOfLines={1}>
        {category}
      </CustomText>
      {Icon ? (
        <View style={styles.imgView}>
          <Image source={Icon} resizeMode="contain" style={styles.img} />
        </View>
      ) : emoji ? (
        <CustomText style={styles.emoji}>{emoji}</CustomText>
      ) : (
        <View style={styles.imgView} />
      )}

      <CustomText textStyle={styles.price} numberOfLines={1}>
        {`PKR ${spent || 0}`}
      </CustomText>
      {category !== 'Income' ? (
        <CustomText textStyle={styles.budget} numberOfLines={1}>
          {`Budget ${budget || 0}`}
        </CustomText>
      ) : null}

      {budget ? (
        <View style={styles.progress}>
          <View style={{width: `${progress * 100}%`, height: '100%'}}>
            <LinearGradient
              colors={colors}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{flex: 1, borderColor: theme.secondarylight}}
            />
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default CategoryCard;
