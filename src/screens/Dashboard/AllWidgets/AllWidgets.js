import {ScrollView, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import CustomText from '../../../components/CustomText/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import {
  BackButton,
  CashFlow,
  CategoryCard,
  CustomGoals,
  ExpenseStructure,
  IncomeStructure,
  MyBudgets,
} from '../../../components';
import {
  addWidgetAction,
  getWidgetsAction,
  removeWidgetAction,
} from '../../../redux/Dashboard/DashboardAction';
import MydashboardHistory from '../../../components/MydashboardHistory/MydashboardHistory';
import {setAppLoading} from '../../../redux/AppLoader/appLoaderAction';
import analytics from '@react-native-firebase/analytics';

const AllWidgets = () => {
  const allWidgets = useSelector(state => state.DashboardReducer.allWidgets);
  const user = useSelector(state => state.auth.user);
  const [mywidgets, setmywidgets] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWidgetsAction());
  }, []);

  useEffect(() => {
    if (Object.keys(allWidgets).length > 0) {
      dispatch(setAppLoading(true));
      let obj = {...allWidgets};
      for (let i = 0; i < user?.preference?.length; i++) {
        const str = user?.preference[i];
        if (obj.hasOwnProperty(str)) {
          obj[str].exists = true;
        } else {
          obj[str] = {exists: false};
        }
      }
      setmywidgets(obj);
      dispatch(setAppLoading(false));
    }
  }, [allWidgets]);

  const handleAddCard = async val => {
    try {
      dispatch(setAppLoading(true));
      await dispatch(addWidgetAction({preference: val}));
      await analytics().logEvent('add_widgets', {
        description: `add ${val} widget`,
      });
    } catch (error) {
      console.log('add card', error);
    }
  };

  const handleRemoveCard = async val => {
    try {
      dispatch(setAppLoading(true));
      await dispatch(removeWidgetAction({preference: val}));
      await analytics().logEvent('remove_widgets', {
        description: `remove ${val} widget`,
      });
    } catch (error) {
      console.log('remove card:', error);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <CustomText textStyle={styles.heading}>All Widgets</CustomText>
      <ScrollView showsVerticalScrollIndicator={false}>
        {mywidgets?.categories?.length ? (
          <CustomText textStyle={styles.expense}>
            This months expenses:
          </CustomText>
        ) : null}
        {mywidgets?.categories?.length ? (
          <>
            <FlatList
              style={styles.expenselist}
              data={mywidgets?.categories.slice(0, 6)}
              numColumns={3}
              columnWrapperStyle={{alignSelf: 'center'}}
              renderItem={({item, index}) => {
                const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
                const result =
                  item?.budgets[0]?.spend > 0 && item?.budgets[0]?.amount > 0
                    ? item?.budgets[0]?.spend / item?.budgets[0]?.amount
                    : 0;
                const progress = result > 1 ? 1 : result;
                if (!imagePathRegex.test(item?.icon)) {
                  return (
                    <CategoryCard
                      key={index}
                      category={item?.name}
                      emoji={item?.icon}
                      budget={item?.budgets[0]?.amount || null}
                      progress={progress}
                      spent={
                        item?.budgets?.length
                          ? item?.budgets[0]?.spend
                          : item?.spend
                      }
                    />
                  );
                }
                return (
                  <CategoryCard
                    budget={item?.budgets[0]?.amount || null}
                    progress={progress}
                    spent={
                      item?.budgets?.length
                        ? item?.budgets[0]?.spend
                        : item?.spend
                    }
                    key={index}
                    category={item?.name}
                    Icon={{uri: item?.icon}}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
            <CustomText
              onPress={() => {
                mywidgets?.categories?.exists
                  ? handleRemoveCard('categories')
                  : handleAddCard('categories');
              }}
              textStyle={styles.add}>
              {mywidgets?.categories?.exists ? 'Remove' : 'Add'}
            </CustomText>
          </>
        ) : null}

        {mywidgets?.budget ? (
          <>
            <MyBudgets hideFilter={true} progressData={mywidgets?.budget} />
            <CustomText
              onPress={() => {
                mywidgets?.budget?.exists
                  ? handleRemoveCard('budget')
                  : handleAddCard('budget');
              }}
              textStyle={styles.add}>
              {mywidgets?.budget?.exists ? 'Remove' : 'Add'}
            </CustomText>
          </>
        ) : null}
        {mywidgets?.cashflow ? (
          Object.keys(mywidgets?.cashflow) ? (
            <>
              <CashFlow
                hideFilter={true}
                heading={'Cash Flow'}
                label1={'Income'}
                label2={'Expense'}
                value1={mywidgets?.cashflow?.income}
                value2={mywidgets?.cashflow?.expense}
                progress1={
                  user?.balance > 0 && mywidgets?.cashflow?.income > 0
                    ? mywidgets?.cashflow?.income / user?.balance
                    : 0
                }
                progress2={
                  user?.balance > 0 &&
                  mywidgets?.cashflow?.expense > 0 &&
                  mywidgets?.cashflow?.income > 0
                    ? mywidgets?.cashflow?.expense / mywidgets?.cashflow?.income
                    : 0
                }
              />
              <CustomText
                onPress={() => {
                  mywidgets?.cashflow?.exists
                    ? handleRemoveCard('cashflow')
                    : handleAddCard('cashflow');
                }}
                textStyle={styles.add}>
                {mywidgets?.cashflow?.exists ? 'Remove' : 'Add'}
              </CustomText>
            </>
          ) : null
        ) : null}
        {mywidgets?.goals ? (
          <>
            <CustomGoals hideFilter={true} progressData={mywidgets?.goals} />
            <CustomText
              onPress={() => {
                mywidgets?.goals?.exists
                  ? handleRemoveCard('goals')
                  : handleAddCard('goals');
              }}
              textStyle={styles.add}>
              {mywidgets?.goals?.exists ? 'Remove' : 'Add'}
            </CustomText>
          </>
        ) : null}
        {mywidgets?.expense ? (
          <>
            <ExpenseStructure
              hideFilter={true}
              chartData={mywidgets?.expense}
              heading={'Expense Structure'}
            />
            <CustomText
              onPress={() => {
                mywidgets?.expense?.exists
                  ? handleRemoveCard('expense')
                  : handleAddCard('expense');
              }}
              textStyle={styles.add}>
              {mywidgets?.expense?.exists ? 'Remove' : 'Add'}
            </CustomText>
          </>
        ) : null}
        {mywidgets?.income ? (
          <>
            <IncomeStructure
              hideFilter={true}
              chartData={mywidgets?.income}
              heading={'Income Structure'}
            />
            <CustomText
              onPress={() => {
                mywidgets?.income?.exists
                  ? handleRemoveCard('income')
                  : handleAddCard('income');
              }}
              textStyle={styles.add}>
              {mywidgets?.income?.exists ? 'Remove' : 'Add'}
            </CustomText>
          </>
        ) : null}

        {mywidgets?.history ? (
          <>
            <MydashboardHistory
              hideshow={true}
              progressData={mywidgets?.history}
            />
            <CustomText
              onPress={() => {
                mywidgets?.history?.exists
                  ? handleRemoveCard('history')
                  : handleAddCard('history');
              }}
              textStyle={styles.add}>
              {mywidgets?.history?.exists ? 'Remove' : 'Add'}
            </CustomText>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default AllWidgets;
