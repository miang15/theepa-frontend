import {FlatList, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import theme from '../../../utils/theme';
import {styles} from './styles';
import CustomText from '../../../components/CustomText/CustomText';
import {padding} from '../../../utils/Layout';
import {useRoute} from '@react-navigation/native';
import {BackButton, CustomGradient} from '../../../components';
import Images from '../../../constants/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import {useDispatch} from 'react-redux';
import {
  setAppLoading,
  setAppToast,
} from '../../../redux/AppLoader/appLoaderAction';
import http from '../../../config/http';
import {ACCOUNT} from '../../../config/endpoint';
import {addAccountAction} from '../../../redux/Dashboard/DashboardAction';
import analytics from '@react-native-firebase/analytics';

const SyncAccount = ({navigation}) => {
  const route = useRoute();
  const screen = route?.params?.manualflow;
  const banks = route?.params?.banksData;
  const [allbanks, setallbanks] = useState([...banks]);
  const dispatch = useDispatch();

  const handleAccountCreation = async () => {
    try {
      const hasSyncTrue = allbanks?.some(obj => obj?.isSync === true);

      if (hasSyncTrue) {
        let arr = [];
        dispatch(setAppLoading(true));
        const addAccountPromises = allbanks
          .filter(item => item?.isSync)
          .map(async item => {
            const data = {
              accountID: item?.accountID,
              accountName: item?.accountName,
              amount: Number(0),
              Icon: item?.bankIcon,
              isManual: false,
              isSync: item?.isSync,
            };

            const accountRes = await http.post(ACCOUNT.addaccount, data);
            if (accountRes?.data?.success) {
              const bank = accountRes?.data?.data?.budget?.account;
              arr.push(bank);
            }

            return dispatch(addAccountAction(data));
          });

        const results = await Promise.all(addAccountPromises);
        dispatch(setAppLoading(false));

        if (screen && results?.every(result => result)) {
          navigation.replace('SyncLoading', {
            allbanks: arr,
            manualflow: screen,
          });
        } else {
          navigation.replace('SyncLoading', {
            allbanks: arr,
          });
        }
        await analytics().logEvent('account_creation', {
          description: `Synced account created`,
        });
      } else {
        dispatch(
          setAppToast({
            title: 'Alert',
            description: 'Please sync at least 1 account to proceed',
            status: 'danger',
            showToast: true,
          }),
        );
      }
    } catch (error) {
      console.log('account creation ', error);
    }
  };

  const handleAccountSync = async ind => {
    const arr = [...allbanks];
    arr[ind].isSync = !arr[ind].isSync;
    setallbanks(arr);
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <CustomText textStyle={styles.desc}>
        {allbanks?.length == 1
          ? `${allbanks?.length} Account Found!`
          : `${allbanks?.length} Accounts Found!`}
      </CustomText>
      <CustomText textStyle={styles.accounts}>
        {`We have found ${allbanks?.length} un-synced ${
          allbanks?.length < 2 ? 'account' : 'accounts'
        } while syncing. Select the ${
          allbanks?.length < 2 ? 'account' : 'accounts'
        } you would like to sync.`}
      </CustomText>
      <FlatList
        style={styles.list}
        contentContainerStyle={{...padding(10, 0, 10, 0)}}
        data={allbanks}
        ListHeaderComponent={() => {
          return <CustomText style={styles.banknames}>Sync</CustomText>;
        }}
        renderItem={({item, index}) => {
          return (
            <View style={styles.row}>
              <View style={styles.innerrow}>
                <View style={styles.bankimg}>
                  <Image
                    source={
                      item?.bankIcon
                        ? {uri: item?.bankIcon}
                        : Images.allbanksiconHome
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
              <ToggleSwitch
                isOn={item?.isSync}
                onColor={theme.secondary}
                offColor={theme.gray}
                size="small"
                onToggle={isOn => handleAccountSync(index)}
              />
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <CustomGradient title={'Proceed'} onPress={handleAccountCreation} />
    </View>
  );
};

export default SyncAccount;
