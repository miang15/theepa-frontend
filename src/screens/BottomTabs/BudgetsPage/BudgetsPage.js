import {View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {
  BackButton,
  CustomGradient,
  CustomProgress,
  DetailModal,
} from '../../../components';
import CustomText from '../../../components/CustomText/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteBudgetAction,
  getBudgetAction,
} from '../../../redux/Budget/BudgetAction';
import {setAppLoading} from '../../../redux/AppLoader/appLoaderAction';
import analytics from '@react-native-firebase/analytics';

const BudgetsPage = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const allBudgets = useSelector(state => state.BudgetReducer.budget);
  const [detail, setDetail] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBudgets = async () => {
      await Promise.all([
        dispatch(setAppLoading(true)),
        dispatch(getBudgetAction()),
        dispatch(setAppLoading(false)),
      ]);
    };

    fetchBudgets();
  }, []);

  const handleDelete = async () => {
    try {
      setVisible(false);
      dispatch(deleteBudgetAction(detail?.category?._id));
      await analytics().logEvent('delete_budget', {
        description: `Budget deleted`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <CustomText textStyle={styles.heading}>Your Budgets</CustomText>
      <CustomText textStyle={styles.active}>Active Budgets</CustomText>
      {allBudgets?.filter(item => item.status == 'active')?.length ? (
        <FlatList
          style={styles.activelist}
          data={allBudgets?.filter(item => item.status == 'active')}
          renderItem={({item, index}) => {
            if (item?.category?.name) {
              const result = item?.spend > 0 ? item?.spend / item?.amount : 0;
              const progress = result > 1 ? 1 : result;
              return (
                <CustomProgress
                  key={index}
                  alert={true}
                  onPress={() => {
                    navigation.navigate('BudgetDetails', {details: item});
                  }}
                  label={item?.category?.name}
                  value={
                    item?.spend > 0
                      ? `${item?.spend}/${item?.amount}`
                      : item?.amount
                  }
                  progress={progress}
                />
              );
            }
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>
          No Active Budgets Available
        </CustomText>
      )}

      <CustomText textStyle={styles.completed}>Completed Budgets</CustomText>
      {allBudgets?.filter(item => item.status == 'completed')?.length ? (
        <FlatList
          style={styles.activelist}
          data={allBudgets?.filter(item => item.status == 'completed')}
          renderItem={({item, index}) => {
            if (item?.category?.name) {
              const result = item?.spend > 0 ? item?.spend / item?.amount : 0;
              const progress = result > 1 ? 1 : result;
              return (
                <CustomProgress
                  key={index}
                  onPress={() => {
                    navigation.navigate('BudgetDetails', {details: item});
                  }}
                  alert={true}
                  label={item?.category?.name}
                  value={
                    item?.spend > 0
                      ? `${item?.spend}/${item?.amount}`
                      : item?.amount
                  }
                  progress={progress}
                />
              );
            }
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>
          No Completed Budgets Available
        </CustomText>
      )}
      <CustomText textStyle={styles.completed}>Exceeded Budgets</CustomText>
      {allBudgets?.filter(item => item.status == 'incompleted')?.length ? (
        <FlatList
          style={styles.activelist}
          data={allBudgets?.filter(item => item.status == 'incompleted')}
          renderItem={({item, index}) => {
            if (item?.category?.name) {
              const result = item?.spend > 0 ? item?.spend / item?.amount : 0;
              const progress = result > 1 ? 1 : result;
              return (
                <CustomProgress
                  key={index}
                  onPress={() => {
                    navigation.navigate('BudgetDetails', {details: item});
                  }}
                  alert={true}
                  label={item?.category?.name}
                  value={
                    item?.spend > 0
                      ? `${item?.spend}/${item?.amount}`
                      : item?.amount
                  }
                  progress={progress}
                />
              );
            }
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>No Exceeded Budgets</CustomText>
      )}
      <CustomGradient
        customView={styles.add}
        onPress={() => navigation.navigate('AddNewBudget')}
        title={'+ Add New Budget'}
      />

      <DetailModal
        heading={detail?.category?.name}
        amount={detail?.amount || '0'}
        startdate={detail?.start_date}
        category={detail?.category?.name}
        enddate={detail?.end_date}
        onEdit={() => {
          setVisible(false);
          navigation.navigate('EditNewBudget', {item: detail});
        }}
        onDelete={handleDelete}
        visible={visible}
        setVisible={() => setVisible(false)}
      />
    </View>
  );
};

export default BudgetsPage;
