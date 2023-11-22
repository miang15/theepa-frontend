import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import CustomText from '../../../components/CustomText/CustomText';
import Images from '../../../constants/Images';
import theme from '../../../utils/theme';
import {useDispatch, useSelector} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  deleteAccountAction,
  editAccountAction,
} from '../../../redux/Dashboard/DashboardAction';
import {Modal, Portal} from 'react-native-paper';
import {BackButton, CustomGradient, HeadingCross} from '../../../components';
import {padding} from '../../../utils/Layout';
import analytics from '@react-native-firebase/analytics';

const AllAccounts = ({navigation}) => {
  const dashboardData = useSelector(
    state => state?.DashboardReducer?.dashboard,
  );
  const accounts = useSelector(state => state?.DashboardReducer?.accounts);
  const [showinfo, setshowinfo] = useState(false);
  const [selectedaccount, setselectedaccount] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = async (val, id) => {
    try {
      const data = {
        isSync: val,
      };
      dispatch(editAccountAction(data, id));
      await analytics().logEvent('account_syncing_toggle', {
        description: `Accounts syncing enable or disable`,
        value: val,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      setshowinfo(false);
      dispatch(deleteAccountAction(selectedaccount));
      await analytics().logEvent('account_delete', {
        description: `Account deleted`,
      });
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <CustomText
        numberOfLines={1}
        textStyle={
          styles.balance
        }>{`Balance: PKR ${dashboardData?.userBalance}`}</CustomText>
      {accounts?.UserAccounts?.length ? (
        <FlatList
          style={styles.list}
          contentContainerStyle={{...padding(10, 0, 10, 0)}}
          data={accounts?.UserAccounts}
          ListHeaderComponent={() => {
            return <CustomText style={styles.banknames}>Sync</CustomText>;
          }}
          renderItem={({item, index}) => {
            return (
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => {
                    setselectedaccount(item?._id);
                    setshowinfo(true);
                  }}
                  activeOpacity={theme.opacity}
                  style={styles.delete}>
                  <Image
                    style={styles.icon}
                    source={Images.delete}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
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
                    <CustomText numberOfLines={1} textStyle={styles.amount}>
                      {`PKR ${item?.amount}`}
                    </CustomText>
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
                  onToggle={isOn => handleToggle(isOn, item?._id)}
                />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>No Account Found</CustomText>
      )}
      <CustomGradient
        title={'+ Add Account'}
        onPress={() => navigation.navigate('ManualAccount')}
      />
      <Portal>
        <Modal
          visible={showinfo}
          onDismiss={() => setshowinfo(false)}
          contentContainerStyle={styles.modal}>
          <HeadingCross
            label={'Delete Account'}
            onCross={() => setshowinfo(false)}
            customrow={styles.heading}
          />
          <CustomText textStyle={styles.desc}>
            Are you sure you want to delete this account? All history and data
            related to this account will be permanently deleted.
          </CustomText>
          <CustomGradient
            customView={styles.deleteview}
            title={'Delete'}
            onPress={handleDelete}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default AllAccounts;
