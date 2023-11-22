import {
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../../utils/theme';
import {
  BackButton,
  CustomCategory,
  CustomGradient,
  CustomPicker,
  CustomVendors,
  HeadingCross,
  LabelInput,
} from '../../../components';
import CustomText from '../../../components/CustomText/CustomText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {Checkbox, Modal, Portal} from 'react-native-paper';
import http from '../../../config/http';
import {CATEGORIES, ONBOARDING, TRANSACTION} from '../../../config/endpoint';
import {
  setAppLoading,
  setAppToast,
} from '../../../redux/AppLoader/appLoaderAction';
import Images from '../../../constants/Images';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {
  getAccountAction,
  getCategoryAction,
  getDashboardAction,
  getWidgetsAction,
  updateAccount,
} from '../../../redux/Dashboard/DashboardAction';
import {getProfileAction} from '../../../redux/Auth/authAction';
import {getBudgetAction} from '../../../redux/Budget/BudgetAction';
import analytics from '@react-native-firebase/analytics';

const AddExpense = ({navigation}) => {
  const accounts = useSelector(state => state.DashboardReducer.accounts);
  const dashboardData = useSelector(state => state.DashboardReducer.dashboard);
  const user = useSelector(state => state.auth.user);
  const [myaccounts, setmyaccounts] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [selectedaccount, setselectedaccount] = useState('');
  const [error, seterror] = useState({type: '', msg: ''});
  const [startdatemodal, setstartdatemodal] = useState(false);
  const [amount, setamount] = useState('');
  const [notes, setnotes] = useState('');
  const [date, setdate] = useState('');
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [selectedcategory, setselectedcategory] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [allVendors, setAllVendors] = useState([]);
  const [showvendor, setshowvendor] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [allCategoryIcons, setAllCategoryIcons] = useState([]);
  const allIcons = useSelector(state => state?.CategoryReducer?.categoryIcons);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allIcons?.length) {
      setAllCategoryIcons(allIcons);
    }
  }, [allIcons]);

  useEffect(() => {
    if (accounts?.UserAccounts?.length) {
      let arr = [];
      accounts?.UserAccounts?.forEach(item => {
        if (item?.isManual) {
          arr.push({
            label: item?.accountName,
            value: item?._id,
          });
        }
      });
      setmyaccounts(arr);
    }
  }, [accounts]);

  useEffect(() => {
    if (dashboardData?.userData?.categories?.length) {
      let arr = [...dashboardData?.userData?.categories];
      const vendorsArray = dashboardData?.userData?.categories.flatMap(
        item => item?.vendors,
      );
      setAllVendors(vendorsArray);

      arr.push({
        id: 6,
        name: 'Add New',
        icon: Images.plus,
      });

      setAllCategory(arr);
    }
  }, [dashboardData]);

  const handleAdd = async () => {
    try {
      seterror({type: '', msg: ''});

      if (!selectedaccount)
        return seterror({type: 'account', msg: 'Account is Required'});
      if (!amount.toString().trim())
        return seterror({type: 'amount', msg: 'Amount is Required'});
      if (!date) return seterror({type: 'date', msg: 'Date is Required'});
      if (!selectedcategory)
        return seterror({type: 'category', msg: 'Category is Required'});
      dispatch(setAppLoading(true));
      const datenow = Date.now();
      const data = {
        type: 'expense',
        time: date,
        createdAt: datenow.toString(),
        amount: Number(amount),
        accountID: selectedaccount,
        note: notes.trim() || undefined,
        category: selectedcategory,
      };
      const addRes = await http.post(TRANSACTION.addexpense, data);
      if (addRes?.data?.success) {
        const budget = addRes?.data?.data?.budget?.history?.budget;

        const data = accounts?.UserAccounts?.find(item => {
          if (item?._id == selectedaccount) {
            item.amount = Number(item?.amount) - Number(amount);
            return item;
          }
        });

        await Promise.all([
          dispatch(getDashboardAction()),
          dispatch(updateAccount(data)),
          dispatch(getWidgetsAction()),
          dispatch(getBudgetAction()),
        ]);

        dispatch(setAppLoading(false));
        if (!user?.BudgetndGoalsNotification) {
          setTimeout(() => {
            if (budget?.status == 'completed') {
              dispatch(
                setAppToast({
                  title: 'Success!!!',
                  description: `Your budget is completed`,
                  status: 'success',
                  showToast: true,
                }),
              );
            } else if (budget?.status == 'incompleted') {
              dispatch(
                setAppToast({
                  title: 'Alert',
                  description: `Your budget is Exceeded`,
                  status: 'danger',
                  showToast: true,
                }),
              );
            } else {
              dispatch(
                setAppToast({
                  title: 'Success!!!',
                  description: addRes?.data?.data?.message,
                  status: 'success',
                  showToast: true,
                }),
              );
            }
          }, 1000);
        }

        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      }
      await analytics().logEvent('manual_add_expense', {
        description: `Expense added manually`,
      });
    } catch (error) {}
  };

  const handleAddCategory = async () => {
    try {
      seterror({type: '', msg: ''});

      if (!categoryname.toString().trim()) {
        seterror({type: 'categoryname', msg: 'Category Name is Required'});
      } else if (!emojiIcon) {
        seterror({type: 'icon', msg: 'Category Icon is Required'});
      } else {
        dispatch(setAppLoading(true));
        const addcategoryRes = await http.post(ONBOARDING.addcategory, {
          name: categoryname,
          icon: emojiIcon,
          vendors: selectedVendors,
        });

        if (addcategoryRes?.data?.success) {
          const result = dashboardData?.userData?.categories.reduce(
            (accumulator, category) => {
              const updatedVendors = category?.vendors.filter(vendor => {
                const matchIndex = selectedVendors.indexOf(vendor);
                if (matchIndex !== -1) {
                  selectedVendors.splice(matchIndex, 1); // Remove matched vendor from arr2
                  return false; // Exclude matched vendor from updatedVendors
                }
                return true; // Include vendor in updatedVendors
              });

              if (updatedVendors.length !== category?.vendors.length) {
                accumulator.push({_id: category?._id, vendors: updatedVendors});
              }

              return accumulator;
            },
            [],
          );

          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            const updatecategoryRes = await http.put(
              `${CATEGORIES.updatecategory}/${element?._id}`,
              {vendors: element?.vendors},
            );
          }

          dispatch(getDashboardAction());
          dispatch(getProfileAction());
          dispatch(getWidgetsAction());
          setVisible(false);
        }
        dispatch(setAppLoading(false));
        await analytics().logEvent('new_category', {
          description: `New category added by add expense screen`,
        });
      }
    } catch (error) {
      console.log(error, 'add category error');
    }
  };

  const handleVendorSelection = vendor => {
    if (selectedVendors.includes(vendor)) {
      setSelectedVendors(selectedVendors.filter(item => item !== vendor));
    } else {
      setSelectedVendors([...selectedVendors, vendor]);
    }
  };

  const handleAddNew = async val => {
    if (val?.name == 'Add New') {
      setcategoryname('');
      setEmojiIcon('');
      setselectedcategory('');
      setVisible(true);
    } else {
      setselectedcategory(val?._id);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <CustomText numberOfLines={1} textStyle={styles.heading}>
        Add Expense Details
      </CustomText>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <LabelInput
          disabled={true}
          label={'Amount'}
          placeholder={'Add amount in PKR'}
          value={amount}
          onChangeText={val => {
            const numericValue = val.replace(/[^0-9]/g, '');
            setamount(numericValue);
          }}
          keyboardType={'numeric'}
          customView={styles.input}
        />

        {error?.type == 'amount' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <CustomPicker
          disabled={!myaccounts?.length}
          label={'Account'}
          data={myaccounts}
          setdata={setmyaccounts}
          pickervalue={selectedaccount}
          selectItem={val => {
            seterror({type: '', msg: ''});
            if (val.value == selectedaccount) {
              setselectedaccount('');
            } else {
              const data = accounts?.UserAccounts?.find(
                item => item?._id == val?.value,
              );
              if (data?.amount < amount) {
                seterror({
                  type: 'account',
                  msg: `You have only ${data?.amount} amount in this account`,
                });
                setselectedaccount('');
              } else {
                setselectedaccount(val?.value);
              }
            }
          }}
          title={'Select Account'}
          placeholder={
            myaccounts?.length ? 'Select Account' : 'No Manual Account'
          }
          customContainer={styles.account}
        />
        {error?.type == 'account' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}

        <LabelInput
          label={'Date'}
          placeholder={'Select Date'}
          value={date}
          disabled={false}
          editable={false}
          Icon={Images.calendar}
          onPress={() => setstartdatemodal(true)}
        />

        {error?.type == 'date' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <CustomText textStyle={styles.category}>Select a category</CustomText>
        <FlatList
          style={styles.flatlist}
          data={allCategory}
          showsVerticalScrollIndicator={false}
          numColumns={5}
          renderItem={({item, index}) => {
            const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
            if (index < 10) {
              return (
                <TouchableOpacity
                  onPress={() => handleAddNew(item)}
                  style={styles.categoryview}
                  key={index}
                  activeOpacity={theme.opacity}>
                  {!imagePathRegex.test(item?.icon) &&
                  item?.name !== 'Add New' ? (
                    <View
                      style={{
                        ...styles.emojiview,
                        backgroundColor:
                          selectedcategory == item?._id
                            ? theme.secondary
                            : theme.offwhite,
                      }}
                      activeOpacity={theme.opacity}>
                      <CustomText numberOfLines={1} style={styles.emoji}>
                        {item?.icon}
                      </CustomText>
                    </View>
                  ) : (
                    <View
                      style={{
                        ...styles.imgView,
                        backgroundColor:
                          selectedcategory == item?._id
                            ? theme.secondary
                            : theme.offwhite,
                      }}>
                      <Image
                        style={{
                          ...styles.imgicon,
                          tintColor:
                            selectedcategory == item?._id
                              ? theme.white
                              : theme.secondary,
                        }}
                        source={
                          item?.name == 'Add New'
                            ? Images.plus
                            : {uri: item?.icon}
                        }
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  <CustomText numberOfLines={1} textStyle={styles.name}>
                    {item?.name}
                  </CustomText>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        {error?.type == 'category' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <Portal>
          <Modal
            style={styles.modalView}
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.containerStyle}>
            <HeadingCross
              label={'Create Category'}
              onCross={() => setVisible(false)}
            />
            <LabelInput
              label={'Category Name'}
              placeholder={'Write Category Name'}
              value={categoryname}
              onChangeText={setcategoryname}
              customView={styles.modalinput}
            />

            {error?.type == 'categoryname' ? (
              <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
            ) : null}

            <CustomVendors
              vendors={allVendors}
              selectedvendor={selectedVendors}
              handleVendor={val => handleVendorSelection(val)}
              onCross={ind => {
                const updatedArray = [...selectedVendors];
                updatedArray.splice(ind, 1);
                setSelectedVendors(updatedArray);
              }}
            />
            {/* <LabelInput
              label={'Select Vendor'}
              value={
                selectedVendors?.length
                  ? `${selectedVendors?.length} vendors selected`
                  : null
              }
              placeholder={'Select Vendor Name'}
              editable={false}
              onPress={() => {
                setSelectedVendors([]);
                setshowvendor(true);
              }}
              Icon={Images.dropdown}
            /> */}

            <Portal>
              <Modal
                style={styles.vendorView}
                visible={showvendor}
                onDismiss={() => setshowvendor(false)}
                contentContainerStyle={styles.vendorContainer}>
                <Ionicons
                  style={styles.vendorclose}
                  onPress={() => setshowvendor(false)}
                  name="close-sharp"
                  size={24}
                  color={theme.black}
                />
                <CustomText
                  textStyle={
                    styles.vendordesc
                  }>{`Which of these vendors should we categorize under ${categoryname}?`}</CustomText>
                <FlatList
                  style={styles.vendorlist}
                  data={allVendors}
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.vendorrow}>
                        <Checkbox
                          status={
                            selectedVendors.includes(item)
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            handleVendorSelection(item);
                          }}
                          color={theme.skyblue}
                          uncheckedColor={theme.black}
                        />
                        <CustomText
                          textStyle={styles.vendorItem}
                          numberOfLines={1}>
                          {item}
                        </CustomText>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index}
                  showsVerticalScrollIndicator={false}
                />
                <CustomButton
                  onPress={() => setshowvendor(false)}
                  title={'Done'}
                  customStyle={styles.done}
                />
              </Modal>
            </Portal>
            {error?.type == 'vendors' ? (
              <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
            ) : null}
            <CustomText textStyle={styles.selecticon}>
              Select an icon
            </CustomText>
            {allCategoryIcons?.length ? (
              <FlatList
                numColumns={5}
                style={styles.iconlist}
                data={allCategoryIcons}
                renderItem={({item, index}) => {
                  const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

                  return (
                    <TouchableOpacity
                      onPress={() => setEmojiIcon(item?.Url)}
                      activeOpacity={theme.opacity}
                      style={{
                        ...styles.iconview,
                        backgroundColor:
                          emojiIcon == item?.Url
                            ? theme.brightgreen
                            : theme.offwhite,
                      }}>
                      {imagePathRegex.test(item?.Url) ? (
                        <Image
                          style={{
                            ...styles.img,
                            tintColor:
                              emojiIcon == item?.Url
                                ? theme.white
                                : theme.secondary,
                          }}
                          source={{uri: item?.Url}}
                          resizeMode="contain"
                        />
                      ) : (
                        <CustomText textStyle={styles.emoji}>
                          {item?.Url}
                        </CustomText>
                      )}
                    </TouchableOpacity>
                  );
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
              />
            ) : null}
            <CustomText
              onPress={() => setShowEmoji(true)}
              textStyle={styles.viewmore}>
              view more
            </CustomText>
            <Portal>
              <Modal
                visible={showEmoji}
                onDismiss={() => setShowEmoji(false)}
                contentContainerStyle={styles.emojiModal}>
                <Entypo
                  onPress={() => setShowEmoji(false)}
                  style={styles.cross}
                  name="cross"
                  size={24}
                  color={theme.black}
                />
                <EmojiSelector
                  category={Categories.symbols}
                  // style={styles.emojiselector}
                  showSearchBar={false}
                  showSectionTitles={false}
                  onEmojiSelected={emoji => {
                    setEmojiIcon(emoji);
                    setAllCategoryIcons([...allCategoryIcons, {Url: emoji}]);
                    setShowEmoji(false);
                  }}
                />
              </Modal>
            </Portal>
            {error?.type == 'icon' ? (
              <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
            ) : null}
            <CustomGradient
              customView={styles.setcategory}
              onPress={handleAddCategory}
              title={'Add'}
            />
          </Modal>
        </Portal>
        <TextInput
          placeholder="Notes"
          numberOfLines={5}
          value={notes}
          onChangeText={setnotes}
          textAlignVertical="top"
          multiline={true}
          style={styles.notes}
        />
        <CustomGradient
          customView={styles.add}
          title={'Add'}
          onPress={handleAdd}
        />
      </ScrollView>
      <DateTimePickerModal
        maximumDate={new Date()}
        isVisible={startdatemodal}
        mode="date"
        onConfirm={date => {
          const formatdate = moment(date).format('YYYY-MM-DD');
          setdate(formatdate);
          setstartdatemodal(false);
        }}
        onCancel={() => setstartdatemodal(false)}
      />
    </View>
  );
};

export default AddExpense;
