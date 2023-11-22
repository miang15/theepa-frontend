import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Accounts,
  AllAccounts,
  BalanceTrend,
  DrawerHeader,
  ExpenseStructure,
  IncomeStructure,
} from '../../../components';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import http from '../../../config/http';
import {setAppLoading} from '../../../redux/AppLoader/appLoaderAction';
import analytics from '@react-native-firebase/analytics';

const Reports = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const [balancecheck, setbalancecheck] = useState(false);
  const [expensecheck, setexpensecheck] = useState(false);
  const accounts = useSelector(state => state?.DashboardReducer?.accounts);
  const allWidgets = useSelector(state => state.DashboardReducer.allWidgets);
  const [reports, setreports] = useState();
  const dispatch = useDispatch();
  const [balancetrend, setbalancetrend] = useState();
  const [balancelabels, setbalancelabels] = useState();
  const [expensedata, setexpensedata] = useState();
  const [incomedata, setincomedata] = useState();
  const [selected, setselected] = useState('All');

  useEffect(() => {
    navigation.addListener('focus', () => {
      handleFilterHistory();
    });
  }, []);

  useEffect(() => {
    handleFilterHistory();
  }, [checked, expensecheck, balancecheck, selected]);

  const handleFilterHistory = async () => {
    dispatch(setAppLoading(true));
    let link =
      selected && selected !== 'All'
        ? `report/?accountid=${selected}`
        : `report/?limit=0`;

    if (checked) {
      link += `&incomestructure=${checked.toLowerCase()}`;
    }

    if (expensecheck) {
      link += `&expensestructure=${expensecheck.toLowerCase()}`;
    }

    if (balancecheck) {
      link += `&balancetrendtime=${balancecheck.toLowerCase()}`;
    }
    const res = await http.get(link);
    if (res?.data?.success) {
      setreports(res?.data?.data?.ReportData);
      const data = res?.data?.data?.ReportData;
      if (data?.balance_Filter) {
        const convertedArray = Object.entries(data?.balance_Filter).map(
          ([label, value]) => {
            return {
              label:
                balancecheck == 'Year'
                  ? label.substr(0, 4)
                  : label.substr(0, 3), // Extract the first three characters of the day string
              value: value,
            };
          },
        );

        if (convertedArray?.length) {
          const label = convertedArray.map(item => item?.label);
          const values = convertedArray.map(item => item?.value);
          setbalancetrend(values);
          setbalancelabels(label);
        }
        // let balance = data?.balance_trend?.map(item => item?.amount);
      }
      setexpensedata(data?.expense_structure);
      setincomedata(data?.income_structure);
      dispatch(setAppLoading(false));
      await analytics().logEvent('report_filter', {
        description: `Reports filter`,
      });
    } else {
      dispatch(setAppLoading(false));
    }
  };

  const handleAddAccount = async () => {
    try {
      navigation.navigate('ManualAccount');
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <DrawerHeader />

      <AllAccounts
        data={accounts?.UserAccounts}
        onPress={val => {
          setselected(val);
        }}
        onPressAll={() => {
          setselected('All');
        }}
        selected={selected}
        onPlus={handleAddAccount}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BalanceTrend
          balancedata={balancetrend}
          balancelabels={balancelabels}
          checked={balancecheck}
          setChecked={val => {
            if (balancecheck == val) {
              setbalancecheck('');
            } else {
              setbalancecheck(val);
            }
          }}
        />
        <ExpenseStructure
          checked={expensecheck}
          setChecked={val => {
            if (expensecheck == val) {
              setexpensecheck('');
            } else {
              setexpensecheck(val);
            }
          }}
          chartData={expensedata}
        />
        <IncomeStructure
          checked={checked}
          setChecked={val => {
            if (checked == val) {
              setChecked('');
            } else {
              setChecked(val);
            }
          }}
          chartData={incomedata}
        />
      </ScrollView>
    </View>
  );
};

export default Reports;
