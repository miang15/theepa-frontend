import {View, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import CustomText from '../CustomText/CustomText';
import Images from '../../constants/Images';
import theme from '../../utils/theme';

const TransactionCard = ({
  amount,
  date,
  accountName,
  color,
  category,
  customview,
  Icon,
}) => {
  return (
    <View style={[styles.row1, customview]}>
      <View style={styles.innerrow}>
        <View style={styles.imgview}>
          <Image
            source={Icon ? {uri: Icon} : Images.questionmark}
            resizeMode="contain"
            style={styles.img}
          />
        </View>
        <View style={styles.column}>
          <CustomText numberOfLines={1} textStyle={styles.category}>
            {category}
          </CustomText>
          {date ? (
            <CustomText numberOfLines={1} textStyle={styles.value}>
              {date}
            </CustomText>
          ) : null}
          <CustomText numberOfLines={1} textStyle={styles.bank}>
            {accountName}
          </CustomText>
        </View>
      </View>
      <CustomText
        numberOfLines={1}
        textStyle={{
          ...styles.amount,
          color: color ? color : theme.secondarylight,
        }}>{`${amount}`}</CustomText>
    </View>
    // <View style={styles.container}>
    //   <View style={styles.row1}>
    //     <View style={styles.innerrow}>
    //       <View style={styles.imgview}>
    //         <Image
    //           source={Images.food}
    //           resizeMode="contain"
    //           style={styles.img}
    //         />
    //       </View>
    //       <CustomText
    //
    //         numberOfLines={1}
    //         textStyle={styles.category}>
    //         {category}
    //       </CustomText>
    //     </View>
    //     {amount ? (
    //       <CustomText
    //
    //         numberOfLines={1}
    //         textStyle={styles.value}>
    //         {`PKR ${amount}`}
    //       </CustomText>
    //     ) : null}
    //   </View>
    //   <View style={styles.row2}>
    //     <CustomText
    //
    //       numberOfLines={1}
    //       textStyle={styles.bank}>
    //       HBL
    //     </CustomText>
    //     {date ? (
    //       <CustomText
    //
    //         numberOfLines={1}
    //         textStyle={styles.value}>
    //         {date}
    //       </CustomText>
    //     ) : null}
    //   </View>
    // </View>
  );
};

export default TransactionCard;
