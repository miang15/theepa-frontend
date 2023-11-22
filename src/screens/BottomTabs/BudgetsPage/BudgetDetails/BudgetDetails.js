import {ScrollView, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {
  BackButton,
  CustomGradient,
  CustomPicker,
  CustomSocialBtn,
  LabelInput,
} from '../../../../components';
import {useRoute} from '@react-navigation/native';
import Images from '../../../../constants/Images';
import {margin} from '../../../../utils/Layout';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  deleteBudgetAction,
  updateBudgetAction,
} from '../../../../redux/Budget/BudgetAction';
import CustomText from '../../../../components/CustomText/CustomText';
import {setAppLoading} from '../../../../redux/AppLoader/appLoaderAction';
import analytics from '@react-native-firebase/analytics';

const BudgetDetails = () => {
  const route = useRoute();
  const details = route?.params?.details;
  const allcategory = useSelector(state => state.DashboardReducer.category);
  const [amount, setamount] = useState('');
  const [dropdownCategory, setdropdownCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [spendamount, setspendamount] = useState('');
  const [name, setname] = useState('');

  const [startdate, setstartdate] = useState('');
  const [startdatemodal, setstartdatemodal] = useState(false);
  const [enddate, setenddate] = useState('');
  const [enddatemodal, setenddatemodal] = useState(false);
  const [error, seterror] = useState({type: '', msg: ''});
  const dispatch = useDispatch();
  const inputref = useRef();

  useEffect(() => {
    if (details) {
      dispatch(setAppLoading(true));
      setamount(details?.amount.toString());
      setSelectedCategory(details?.category?._id);
      setspendamount(details?.spend.toString());
      setname(details?.category?.name);
      setstartdate(moment(details?.start_date).format('YYYY-MM-DD'));
      setenddate(moment(details?.end_date).format('YYYY-MM-DD'));
      dispatch(setAppLoading(true));
    }
  }, [details]);

  useEffect(() => {
    if (allcategory?.length) {
      let tempCategory = [];
      allcategory?.forEach((item, index) => {
        tempCategory.push({
          label: item?.name,
          value: item?._id,
        });
      });

      setdropdownCategory(tempCategory);
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

  const handleUpdateBudget = async () => {
    try {
      seterror({type: '', msg: ''});
      if (!amount.toString().trim()) {
        seterror({type: 'amount', msg: 'Amount is Required'});
      } else if (!spendamount.toString().trim()) {
        seterror({type: 'spendamount', msg: 'Spend Amount is Required'});
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

        await dispatch(updateBudgetAction(data, selectedCategory));
        dispatch(setAppLoading(false));
        await analytics().logEvent('update_budget', {
          description: `Budget updated`,
        });
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{...margin(15, 0, 0, 0)}}
        contentContainerStyle={{flexGrow: 1}}>
        <CustomText textStyle={styles.heading} numberOfLines={2}>
          {name}
        </CustomText>

        <CustomPicker
          label={'Select Category'}
          disabled={true}
          data={dropdownCategory}
          pickervalue={selectedCategory}
          setdata={setdropdownCategory}
          setPickerValue={setSelectedCategory}
          selectItem={val => {
            setSelectedCategory(val?.value);
            setname(val?.label);
          }}
          placeholder={'Category'}
          title={'Select Category'}
        />
        <LabelInput
          label={'Total Amount'}
          placeholder={'Total amount of budget'}
          value={amount}
          onChangeText={val => {
            const numericValue = val.replace(/[^0-9]/g, '');
            setamount(numericValue);
          }}
          keyboardType={'numeric'}
          disabled={true}
          editable={details?.status !== 'completed'}
        />
        {error?.type == 'amount' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Spend Amount'}
          placeholder={'Spend amount of budget'}
          value={spendamount}
          onChangeText={val => {
            const numericValue = val.replace(/[^0-9]/g, '');
            setspendamount(numericValue);
          }}
          keyboardType={'numeric'}
          disabled={true}
          editable={details?.status !== 'completed'}
        />
        {error?.type == 'spendamount' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Budget Start Date'}
          placeholder={'Select Date'}
          value={startdate}
          onPress={() => setstartdatemodal(true)}
          keyboardType={'numeric'}
          disabled={details?.status == 'completed'}
          editable={false}
          Icon={Images.calendar}
        />
        {error?.type == 'startdate' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Budget End Date'}
          placeholder={'Select Date'}
          value={enddate}
          onPress={() => setenddatemodal(true)}
          keyboardType={'numeric'}
          disabled={details?.status == 'completed'}
          editable={false}
          Icon={Images.calendar}
        />
        {error?.type == 'enddate' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <View style={styles.buttons}>
          {details?.status == 'active' ? (
            <CustomSocialBtn
              onPress={async () => {
                dispatch(deleteBudgetAction(details?.category?._id));
                await analytics().logEvent('delete_budget', {
                  description: `Budget deleted`,
                });
              }}
              title={'Delete'}
              customView={{width: '90%'}}
            />
          ) : null}
          {details?.status == 'active' || details?.status == 'incompleted' ? (
            <CustomGradient
              onPress={handleUpdateBudget}
              title={'Save Changes'}
            />
          ) : null}
        </View>
      </ScrollView>
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
    </View>
  );
};

export default BudgetDetails;
