import {View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import {BackButton, CustomGradient, CustomProgress} from '../../../components';
import CustomText from '../../../components/CustomText/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import {getGoalsAction} from '../../../redux/Goals/GoalsAction';
import {setAppLoading} from '../../../redux/AppLoader/appLoaderAction';
import analytics from '@react-native-firebase/analytics';

const GoalsPage = ({navigation}) => {
  const allgoals = useSelector(state => state.GoalsReducer.goals);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGoals = async () => {
      await Promise.all([
        dispatch(setAppLoading(true)),
        dispatch(getGoalsAction()),
        dispatch(setAppLoading(false)),
      ]);
    };

    fetchGoals();
  }, []);

  return (
    <View style={styles.container}>
      <BackButton />
      <CustomText textStyle={styles.heading}>Your Goals</CustomText>
      <CustomText textStyle={styles.active}>Active Goals</CustomText>
      {allgoals?.filter(item => item.status == 'active')?.length ? (
        <FlatList
          style={styles.activelist}
          data={allgoals?.filter(item => item.status == 'active')}
          renderItem={({item, index}) => {
            const result =
              item?.currentAmount > 0
                ? item?.currentAmount / item?.targetAmount
                : 0;
            const progress = result > 1 ? 1 : result;
            return (
              <CustomProgress
                onPress={() => {
                  navigation.navigate('GoalDetails', {details: item});
                }}
                label={item?.name}
                value={
                  item?.currentAmount > 0
                    ? `${item?.currentAmount}/${item?.targetAmount}`
                    : item?.targetAmount
                }
                progress={progress}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>
          No Active Goals Available
        </CustomText>
      )}

      <CustomText textStyle={styles.completed}>Achieved Goals</CustomText>
      {allgoals?.filter(item => item.status == 'completed')?.length ? (
        <FlatList
          style={styles.activelist}
          data={allgoals?.filter(item => item.status == 'completed')}
          renderItem={({item, index}) => {
            const result =
              item?.currentAmount > 0
                ? item?.currentAmount / item?.targetAmount
                : 0;
            const progress = result > 1 ? 1 : result;
            return (
              <CustomProgress
                onPress={() => {
                  navigation.navigate('GoalDetails', {details: item});
                }}
                label={item?.name}
                value={
                  item?.currentAmount > 0
                    ? `${item?.currentAmount}/${item?.targetAmount}`
                    : item?.targetAmount
                }
                progress={progress}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>
          No Achieved Goals Available
        </CustomText>
      )}
      <CustomText textStyle={styles.active}>Unachieved Goals</CustomText>
      {allgoals?.filter(item => item.status == 'unachieved')?.length ? (
        <FlatList
          style={styles.activelist}
          data={allgoals?.filter(item => item.status == 'unachieved')}
          renderItem={({item, index}) => {
            const result =
              item?.currentAmount > 0
                ? item?.currentAmount / item?.targetAmount
                : 0;
            const progress = result > 1 ? 1 : result;
            return (
              <CustomProgress
                onPress={() => {
                  navigation.navigate('GoalDetails', {details: item});
                }}
                label={item?.name}
                value={
                  item?.currentAmount > 0
                    ? `${item?.currentAmount}/${item?.targetAmount}`
                    : item?.targetAmount
                }
                progress={progress}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>
          No unachieved Goals Available
        </CustomText>
      )}
      <CustomGradient
        customView={styles.add}
        onPress={() => navigation.navigate('AddNewGoal')}
        title={'+ Add New Goal'}
      />
    </View>
  );
};

export default GoalsPage;
