import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoryAction} from '../../../../redux/Dashboard/DashboardAction';
import CustomText from '../../../../components/CustomText/CustomText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {styles} from './styles';
import theme from '../../../../utils/theme';
import moment from 'moment';
import {addBudgetAction} from '../../../../redux/Budget/BudgetAction';
import {
  BackButton,
  CustomGradient,
  HeadingCross,
  LabelInput,
} from '../../../../components';
import Images from '../../../../constants/Images';
import {setAppLoading} from '../../../../redux/AppLoader/appLoaderAction';
import analytics from '@react-native-firebase/analytics';

const AddNewBudget = ({navigation}) => {
  const allcategory = useSelector(state => state.DashboardReducer.category);
  const accounts = useSelector(state => state?.DashboardReducer?.accounts);
  const allBudgets = useSelector(state => state.BudgetReducer.budget);

  const totalAmount = accounts?.UserAccounts?.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue?.amount;
    },
    0,
  );
  const [amount, setamount] = useState('');
  const [dropdownCategory, setdropdownCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [startdate, setstartdate] = useState();
  const [startdatemodal, setstartdatemodal] = useState(false);
  const [enddate, setenddate] = useState();
  const [enddatemodal, setenddatemodal] = useState(false);
  const dispatch = useDispatch();
  const [error, seterror] = useState({type: '', msg: ''});

  useEffect(() => {
    const fetchCategory = async () => {
      dispatch(setAppLoading(true)),
        await dispatch(getCategoryAction()),
        dispatch(setAppLoading(false));
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    if (allcategory?.length) {
      const filteredCategories = allcategory?.filter(item => {
        const hasActiveBudget = item?.budgets?.some(budget => {
          const currentDate = new Date();
          const endDate = new Date(budget?.end_date);
          return (
            (budget.status === 'incompleted' && endDate > currentDate) ||
            budget?.status == 'active'
          );
        });
        return item.name.toLowerCase() !== 'income' && !hasActiveBudget;
      });
      setdropdownCategory(filteredCategories);
    }
  }, [allcategory]);

  const handleEndDate = async date => {
    seterror({type: '', msg: ''});
    const formatdate = moment(date).format('YYYY-MM-DD');
    if (formatdate < startdate) {
      setenddate('');
      seterror({
        type: 'enddate',
        msg: 'End Date must be greater then start date',
      });
    } else {
      setenddate(formatdate);
    }
    setenddatemodal(false);
  };

  const handleStartDate = async date => {
    const formatdate = moment(date).format('YYYY-MM-DD');
    setstartdate(formatdate);
    setstartdatemodal(false);
  };

  const handleAddBudget = async () => {
    try {
      seterror({type: '', msg: ''});
      if (!amount.toString().trim()) {
        seterror({type: 'amount', msg: 'Amount is Required'});
      } else if (amount > totalAmount) {
        seterror({
          type: 'amount',
          msg: "You don't have enough balance in your accounts",
        });
      } else if (!selectedCategory) {
        seterror({type: 'category', msg: 'Category is Required'});
      } else if (!startdate) {
        seterror({type: 'startdate', msg: 'Start Date is Required'});
      } else if (!enddate) {
        seterror({type: 'enddate', msg: 'End Date is Required'});
      } else if (startdate > enddate) {
        seterror({
          type: 'startdate',
          msg: 'Start Date must be less then end date',
        });
      } else {
        dispatch(setAppLoading(true));
        const data = {
          amount: amount,
          start_date: startdate,
          end_date: enddate,
        };

        await dispatch(addBudgetAction(data, selectedCategory));
        dispatch(setAppLoading(false));
        await analytics().logEvent('add_budget', {
          description: `New budget added`,
        });
      }
    } catch (error) {}
  };

  return (
    <View style={styles.slide3}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeadingCross label={'Add New Budget'} hideCross={true} />
        <LabelInput
          label={'Amount'}
          placeholder={'Enter budget amount'}
          value={amount}
          onChangeText={val => {
            const numericValue = val.replace(/[^0-9]/g, '');
            setamount(numericValue);
          }}
          keyboardType={'numeric'}
          disabled={true}
        />
        {error?.type == 'amount' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <CustomText textStyle={styles.category}>Select a category</CustomText>
        {dropdownCategory?.length ? (
          <FlatList
            nestedScrollEnabled
            style={styles.flatlist}
            data={dropdownCategory}
            showsVerticalScrollIndicator={false}
            numColumns={5}
            renderItem={({item, index}) => {
              const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
              if (index < 10) {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(item?._id)}
                    style={styles.categoryview}
                    key={index}
                    activeOpacity={theme.opacity}>
                    {!imagePathRegex.test(item?.icon) &&
                    item?.name !== 'Add New' ? (
                      <View
                        style={{
                          ...styles.emojiview,
                          backgroundColor:
                            selectedCategory == item?._id
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
                        key={index}
                        style={{
                          ...styles.imgView,
                          backgroundColor:
                            selectedCategory == item?._id
                              ? theme.secondary
                              : theme.offwhite,
                        }}>
                        <Image
                          style={{
                            ...styles.imgicon,
                            tintColor:
                              selectedCategory == item?._id
                                ? theme.white
                                : theme.secondary,
                          }}
                          source={{uri: item?.icon}}
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
        ) : null}

        {error?.type == 'category' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Budget Start Date'}
          value={startdate}
          editable={false}
          onPress={() => setstartdatemodal(true)}
          placeholder={'Select Date'}
          Icon={Images.calendar}
        />
        {error?.type == 'startdate' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}

        <LabelInput
          label={'Budget End Date'}
          value={enddate}
          editable={false}
          onPress={() => setenddatemodal(true)}
          placeholder={'Select Date'}
          Icon={Images.calendar}
        />

        {error?.type == 'enddate' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <CustomGradient
          title={'Add Budget'}
          onPress={handleAddBudget}
          customView={styles.add}
        />

        <DateTimePickerModal
          minimumDate={new Date()}
          isVisible={startdatemodal}
          mode="date"
          onConfirm={date => handleStartDate(date)}
          onCancel={() => setstartdatemodal(false)}
        />
        <DateTimePickerModal
          minimumDate={new Date()}
          isVisible={enddatemodal}
          mode="date"
          onConfirm={date => handleEndDate(date)}
          onCancel={() => setenddatemodal(false)}
        />
      </ScrollView>
    </View>
  );
};

export default AddNewBudget;
