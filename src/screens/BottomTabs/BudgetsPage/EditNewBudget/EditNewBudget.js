import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoryAction} from '../../../../redux/Dashboard/DashboardAction';
import CustomText from '../../../../components/CustomText/CustomText';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomPicker from '../../../../components/CustomPicker/CustomPicker';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {styles} from './styles';
import theme from '../../../../utils/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {updateBudgetAction} from '../../../../redux/Budget/BudgetAction';
import {useRoute} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

const EditNewBudget = ({navigation}) => {
  const route = useRoute();
  const detail = route?.params?.item;
  const allcategory = useSelector(state => state.DashboardReducer.category);
  const [amount, setamount] = useState(detail?.amount.toString() || '');
  const [dropdownCategory, setdropdownCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    detail?.category?._id || '',
  );
  const [startdate, setstartdate] = useState(
    moment(detail?.start_date).format('YYYY-MM-DD') || '',
  );
  const [startdatemodal, setstartdatemodal] = useState(false);
  const [enddate, setenddate] = useState(
    moment(detail?.end_date).format('YYYY-MM-DD') || '',
  );
  const [enddatemodal, setenddatemodal] = useState(false);
  const dispatch = useDispatch();
  const [error, seterror] = useState({type: '', msg: ''});

  useEffect(() => {
    dispatch(getCategoryAction());
    const handleLogs = async () => {
      await analytics().logEvent('screens', {
        description: 'edit budget screen',
      });
    };

    handleLogs();
  }, []);

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
      if (!amount) {
        seterror({type: 'amount', msg: 'Amount is Required'});
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
        const data = {
          amount: amount,
          start_date: startdate,
          end_date: enddate,
        };

        dispatch(updateBudgetAction(data, selectedCategory));
        await analytics().logEvent('functionality', {
          description: `update budget`,
        });
      }
    } catch (error) {}
  };

  return (
    <View style={styles.slide3}>
      <View style={styles.row1}>
        <View style={styles.empty} />
        <CustomText numberOfLines={1} textStyle={styles.screen}>
          {`Edit Budget`}
        </CustomText>
        <Entypo
          onPress={() => navigation.goBack()}
          name="cross"
          size={24}
          color={theme.black}
        />
      </View>

      <CustomInput
        label={'Amount'}
        value={amount}
        onChangeText={val => {
          const numericValue = val.replace(/[^0-9]/g, '');
          setamount(numericValue);
        }}
        keyboardType={'numeric'}
        customStyle={styles.goalamount}
      />
      {error?.type == 'amount' ? (
        <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
      ) : null}

      <CustomPicker
        data={dropdownCategory}
        pickervalue={selectedCategory}
        setdata={setdropdownCategory}
        setPickerValue={setSelectedCategory}
        selectItem={val => setSelectedCategory(val?.value)}
        placeholder={'Category'}
        title={'Select Category'}
        customContainer={styles.categorydropdown}
      />
      {error?.type == 'category' ? (
        <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
      ) : null}
      <View style={styles.daterow}>
        <CustomButton
          onPress={() => setstartdatemodal(true)}
          title={startdate || 'Start Date'}
          customLabelStyle={{color: theme.black}}
          customStyle={styles.startdate}
        />
        <CustomButton
          onPress={() => setenddatemodal(true)}
          title={enddate || 'End Date'}
          customLabelStyle={{color: theme.black}}
          customStyle={styles.startdate}
        />
      </View>
      {error?.type == 'startdate' ? (
        <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
      ) : null}
      {error?.type == 'enddate' ? (
        <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
      ) : null}
      <CustomButton
        onPress={handleUpdateBudget}
        customLabelStyle={{color: theme.black}}
        title={`Update Budget`}
        customStyle={styles.setcategory}
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
    </View>
  );
};

export default EditNewBudget;
