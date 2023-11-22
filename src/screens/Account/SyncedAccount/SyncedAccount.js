import {FlatList, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../../utils/theme';
import {styles} from './styles';
import CustomText from '../../../components/CustomText/CustomText';
import {padding} from '../../../utils/Layout';
import {BackButton, CustomGradient} from '../../../components';
import Images from '../../../constants/Images';
import {useSelector} from 'react-redux';

const SyncedAccount = ({navigation}) => {
  const accounts = useSelector(state => state?.DashboardReducer?.accounts);

  return (
    <View style={styles.container}>
      <BackButton />
      <CustomText textStyle={styles.desc}>{`Accounts synced!`}</CustomText>
      <CustomText textStyle={styles.accounts}>
        {`The following accounts have now been synced. Head to the dashboard to see your new balance.`}
      </CustomText>
      <FlatList
        style={styles.list}
        contentContainerStyle={{...padding(10, 0, 10, 0)}}
        data={accounts?.UserAccounts}
        renderItem={({item, index}) => {
          return (
            <View style={styles.row}>
              <View style={styles.innerrow}>
                <View style={styles.bankimg}>
                  <Image
                    source={
                      item?.Icon ? {uri: item?.Icon} : Images.allbanksiconHome
                    }
                    style={theme.img}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.column}>
                  {/* {item?.amount ? (
                    <CustomText numberOfLines={1} textStyle={styles.amount}>
                      {`PKR ${item?.amount}`}
                    </CustomText>
                  ) : null} */}
                  <CustomText numberOfLines={1} textStyle={styles.bankname}>
                    {item?.accountName}
                  </CustomText>
                  <CustomText numberOfLines={1} textStyle={styles.accountID}>
                    {item?.accountID}
                  </CustomText>
                </View>
              </View>
              <AntDesign
                name="checkcircle"
                size={24}
                color={theme.secondarylight}
              />
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <CustomGradient
        title={'Go to Dashboard'}
        onPress={() => navigation.replace('MyDrawer')}
      />
    </View>
  );
};

export default SyncedAccount;
