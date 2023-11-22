import {FlatList, View} from 'react-native';
import React from 'react';
import CustomText from '../../../components/CustomText/CustomText';
import {BackButton, CategoryCard} from '../../../components';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import theme from '../../../utils/theme';

const SelectCategory = () => {
  const dashboardData = useSelector(
    state => state?.DashboardReducer?.dashboard,
  );

  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BackButton />
      <CustomText textStyle={styles.category}>All Categories</CustomText>
      {dashboardData?.userData?.categories?.length ? (
        <FlatList
          style={styles.expenselist}
          data={dashboardData?.userData?.categories}
          numColumns={3}
          columnWrapperStyle={{alignSelf: 'center'}}
          renderItem={({item, index}) => {
            const result =
              item?.budgets[0]?.spend > 0 && item?.budgets[0]?.amount > 0
                ? item?.budgets[0]?.spend / item?.budgets[0]?.amount
                : 0;
            const progress = result > 1 ? 1 : result;
            const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
            if (!imagePathRegex.test(item?.icon)) {
              return (
                <CategoryCard
                  key={index}
                  category={item?.name}
                  emoji={item?.icon}
                  budget={item?.budgets[0]?.amount || null}
                  spent={
                    item?.budgets?.length
                      ? item?.budgets[0]?.spend
                      : item?.spend
                  }
                  progress={progress}
                />
              );
            }
            return (
              <>
                <CategoryCard
                  key={index}
                  category={item?.name}
                  Icon={{uri: item?.icon}}
                  budget={item?.budgets[0]?.amount || null}
                  progress={progress}
                  spent={
                    item?.budgets?.length
                      ? item?.budgets[0]?.spend
                      : item?.spend
                  }
                />
              </>
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : null}
    </View>
  );
};

export default SelectCategory;
