import {View} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {STORAGE_KEYS} from '../../../config/endpoint';
import {
  compareAccountNumbers,
  setLocalStorage,
} from '../../../constants/functions';
import {setAppProgress} from '../../../redux/AppLoader/appLoaderAction';
import {handleAllTransactions} from '../../../constants/Transactions';
import {styles} from './styles';
import theme from '../../../utils/theme';
import ProgressCircle from 'react-native-progress-circle';
import CustomText from '../../../components/CustomText/CustomText';
import {CustomGradient} from '../../../components';
import analytics from '@react-native-firebase/analytics';

const SyncLoading = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const screen = route?.params?.manualflow;
  const AllAccounts = route?.params?.allbanks;

  const allTransactions = useSelector(
    state => state?.SMSParsingReducer?.allTransactions,
  );
  const allCategory = useSelector(state => state.DashboardReducer.category);
  const progressCount = useSelector(state => state.loadingReducer.progress);

  useEffect(() => {
    const fetchData = async () => {
      if (AllAccounts?.length) {
        await handleTransactions();
      }
    };
    fetchData();
  }, [AllAccounts]);

  const handleTransactions = async () => {
    try {
      if (allTransactions?.length && AllAccounts?.length) {
        const filteredSmsArray = allTransactions?.filter(sms => {
          return AllAccounts?.some(bank => {
            if (
              (compareAccountNumbers(sms?.account_no, bank?.accountID) &&
                bank?.isSync) ||
              (sms?.bankName == bank?.accountName &&
                bank?.isSync &&
                sms?.account_no == undefined)
            ) {
              sms.bankName = bank?.accountName;
              return true;
            }
            return false;
          });
        });
        await handleAllTransactions(filteredSmsArray, AllAccounts, allCategory);
      }
    } catch (error) {
      console.log('handle transaction: ', error);
    }
  };

  const handleNavigation = async () => {
    dispatch(setAppProgress(0));
    if (screen) {
      await setLocalStorage(STORAGE_KEYS.ONBOARDING_PAGE, 'Completed');
    }
    navigation.replace('SyncedAccount', {syncedbanks: AllAccounts});
  };

  return (
    <View style={styles.container}>
      <ProgressCircle
        percent={progressCount}
        radius={80}
        borderWidth={8}
        color={theme.secondary}
        shadowColor={theme.offwhite}
        bgColor="#fff">
        <CustomText
          style={{fontSize: 18}}>{`${progressCount.toFixed()}%`}</CustomText>
      </ProgressCircle>
      {progressCount < 100 ? (
        <CustomText
          textStyle={styles.heading}>{`Syncing your accounts...`}</CustomText>
      ) : (
        <CustomText textStyle={styles.heading}>{`Accounts synced`}</CustomText>
      )}
      {progressCount < 100 ? (
        <CustomText
          textStyle={
            styles.desc
          }>{`Please wait while we sync all your selected accounts.`}</CustomText>
      ) : (
        <CustomText
          textStyle={
            styles.desc
          }>{`Your accounts have been synced. Proceed to the next step to review.`}</CustomText>
      )}
      {progressCount >= 100 ? (
        <CustomGradient
          customView={styles.proceed}
          title={'Proceed'}
          onPress={handleNavigation}
        />
      ) : null}
    </View>
  );
};

export default SyncLoading;
