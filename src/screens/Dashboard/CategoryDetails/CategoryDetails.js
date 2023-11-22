import {
  View,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import CustomText from '../../../components/CustomText/CustomText';
import {styles} from './styles';
import {
  AllAccounts,
  BackButton,
  CustomGradient,
  CustomProgress,
  HeadingCross,
  TransactionCard,
} from '../../../components';
import {useRoute} from '@react-navigation/native';
import theme from '../../../utils/theme';
import {Modal, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteCategoryAction,
  updateCategoryAction,
} from '../../../redux/Category/CategoryAction';
import http from '../../../config/http';
import moment from 'moment';
import Images from '../../../constants/Images';
import analytics from '@react-native-firebase/analytics';

const CategoryDetails = ({navigation}) => {
  const route = useRoute();
  const accounts = useSelector(state => state?.DashboardReducer?.accounts);
  const [deletemodal, setdeletemodal] = useState(false);
  const details = route?.params?.details;
  const [editable, seteditable] = useState(false);
  const [name, setname] = useState('');
  const inputref = useRef();
  const [allhistory, setallhistory] = useState([]);
  const [filterhistory, setfilterhistory] = useState([]);
  const [selected, setselected] = useState('All');
  const dispatch = useDispatch();

  const handleEditname = async () => {
    seteditable(true);
    setTimeout(() => {
      inputref.current.focus();
    }, 100);
  };

  useEffect(() => {
    if (details?._id) {
      getHistory(details?._id);
    }
  }, [details]);

  const getHistory = async val => {
    try {
      const res = await http.get(`history/?category=${val}`);

      const history = res?.data?.data?.TransactionHistory?.categoryhistory;
      if (history?.length) {
        setallhistory(history);
        setfilterhistory(history);
      }
    } catch (error) {}
  };

  const handleBlur = async () => {
    if (name.toLowerCase() !== details?.name?.toLowerCase() && name.trim()) {
      const data = {
        id: details?._id,
        name: name,
      };
      dispatch(updateCategoryAction(data));
      await analytics().logEvent('category_update', {
        description: `Category name upadated`,
      });
    }
    seteditable(false);
  };

  const handleAddAccount = async () => {
    try {
      navigation.navigate('ManualAccount');
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <AllAccounts
        data={accounts?.UserAccounts}
        onPress={val => {
          setselected(val);

          const arr = allhistory?.filter(item => item?.accountID == val);
          if (arr.length) {
            setfilterhistory(arr);
          } else {
            setfilterhistory([]);
          }
        }}
        onPressAll={val => {
          setselected(val);
          getHistory(details?._id);
        }}
        selected={selected}
        onPlus={handleAddAccount}
      />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <View style={styles.innerrow}>
            {editable ? (
              <TextInput
                ref={inputref}
                editable={editable}
                value={name || details?.name}
                onChangeText={setname}
                onBlur={handleBlur}
                style={styles.input}
              />
            ) : (
              <CustomText numberOfLines={2} textStyle={styles.input2}>
                {name || details?.name}
              </CustomText>
            )}

            {!details?.isDefault ? (
              <TouchableOpacity
                onPress={handleEditname}
                activeOpacity={theme.opacity}>
                <Image source={Images.edit} resizeMode="cover" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        {details?.name !== 'Income' ? (
          <>
            <CustomText numberOfLines={1} textStyle={styles.budget}>
              Your Budgets
            </CustomText>
            {details?.budgets?.length ? (
              <FlatList
                nestedScrollEnabled
                data={details?.budgets}
                style={styles.history}
                renderItem={({item, index}) => {
                  const result =
                    item?.spend > 0 && item?.amount > 0
                      ? item?.spend / item?.amount
                      : 0;
                  const progress = result > 1 ? 1 : result;
                  return (
                    <CustomProgress
                      alert={true}
                      key={item?._id}
                      label={details?.name}
                      value={
                        item?.spend > 0 && item?.amount > 0
                          ? `${item?.spend}/${item?.amount}`
                          : item?.amount
                      }
                      progress={progress}
                    />
                  );
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <CustomText textStyle={styles.nodata}>No Budget Found</CustomText>
            )}
          </>
        ) : null}

        <CustomText numberOfLines={1} textStyle={styles.transaction}>
          Category Transactions
        </CustomText>
        {filterhistory.length ? (
          <FlatList
            nestedScrollEnabled
            data={filterhistory}
            style={styles.history}
            renderItem={({item, index}) => {
              return (
                <TransactionCard
                  accountName={
                    accounts?.UserAccounts?.find(
                      val => val?._id == item?.accountID,
                    )?.accountName
                  }
                  color={
                    item?.type == 'expense'
                      ? theme.redprimary
                      : theme.secondarylight
                  }
                  category={details?.name || null}
                  amount={
                    item?.type == 'expense'
                      ? `- PKR ${item?.amount}`
                      : `+ PKR ${item?.amount}`
                  }
                  date={moment(item?.time).format('DD MMM, YY')}
                  key={index}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <CustomText textStyle={styles.nodata}>
            No Transaction Found
          </CustomText>
        )}
        {details?.isDefault ? null : (
          <CustomGradient
            customView={styles.delete}
            onPress={() => setdeletemodal(true)}
            title={'Delete'}
          />
        )}
      </ScrollView>
      <Portal>
        <Modal
          visible={deletemodal}
          onDismiss={() => setdeletemodal(false)}
          contentContainerStyle={styles.modal}>
          <HeadingCross
            label={'Delete Category?'}
            onCross={() => setdeletemodal(false)}
            customrow={styles.cross}
          />
          <CustomText textStyle={styles.desc}>
            Deleting this category will also delete all its data, transactions
            and history. Are you sure you want to delete it?
          </CustomText>
          <CustomGradient
            title={'Delete'}
            onPress={async () => {
              setdeletemodal(false);
              dispatch(deleteCategoryAction(details?._id));
              await analytics().logEvent('category_delete', {
                description: `Category deleted`,
              });
            }}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default CategoryDetails;
