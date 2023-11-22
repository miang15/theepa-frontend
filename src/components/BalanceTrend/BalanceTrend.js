import {ScrollView, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import CustomText from '../CustomText/CustomText';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Checkbox} from 'react-native-paper';
import theme from '../../utils/theme';
import {optionsStyles, styles} from './styles';
import {LineChart} from 'react-native-chart-kit';
import {margin, padding, scaleHeight, scaleWidth} from '../../utils/Layout';
import {useNavigation} from '@react-navigation/native';

const BalanceTrend = ({balancedata, balancelabels, checked, setChecked}) => {
  const navigation = useNavigation();
  const menuref = useRef();
  const data = ['Week', 'Month', 'Year'];
  const accounts = ['All Accounts', 'Account 1', 'Account 2', 'Account 3'];

  const chartConfig = {
    backgroundGradientFrom: theme.offwhite,
    backgroundGradientTo: theme.offwhite,
    fillShadowGradientFrom: theme.secondary,
    fillShadowGradientTo: theme.secondarylight,
    color: (opacity = 1) => theme.white,
    strokeWidth: 2, // controls the thickness of the lines
    barPercentage: 2,
    labelColor: (opacity = 1) => theme.primary,
    decimalPlaces: 0,
    useShadowColorFromDataset: true,
    propsForVerticalLabels: {
      fontSize: 10,
    },
    propsForHorizontalLabels: {
      fontSize: 10,
      overflow: 'hidden',
    },
    // The label to append to the abbreviated values
  };
  const chartdata = {
    labels: balancelabels || [],
    datasets: [
      {
        data: balancedata || [0, 0, 0, 0],
        color: (opacity = 1) => theme.secondarylight,
        strokeWidth: 2, // controls the thickness of this line
      },
    ],
  };

  useEffect(() => {
    navigation.addListener('blur', () => {
      menuref?.current?.close();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomText numberOfLines={1} textStyle={styles.heading}>
          Balance Trend
        </CustomText>
        <Menu ref={menuref}>
          <MenuTrigger>
            <AntDesign name="filter" size={22} color={theme.primary} />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {data?.map((item, index) => {
                return (
                  <>
                    <MenuOption key={index} style={styles.row3}>
                      <Checkbox
                        status={checked == item ? 'checked' : 'unchecked'}
                        onPress={() => {
                          if (setChecked) {
                            setChecked(item);
                          }
                          menuref.current.close();
                        }}
                        color={theme.skyblue}
                        uncheckedColor={theme.black}
                      />
                      <CustomText numberOfLines={1} textStyle={styles.option}>
                        {item}
                      </CustomText>
                    </MenuOption>
                  </>
                );
              })}
              {checked == 'Account' ? (
                <>
                  {accounts?.map((item, index) => {
                    return (
                      <MenuOption key={index} style={styles.accountsrow3}>
                        <Checkbox
                          status={checked == item ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked(item);
                            menuref.current.close();
                          }}
                          color={theme.skyblue}
                          uncheckedColor={theme.black}
                        />
                        <CustomText numberOfLines={1} textStyle={styles.option}>
                          {item}
                        </CustomText>
                      </MenuOption>
                    );
                  })}
                </>
              ) : null}
            </ScrollView>
          </MenuOptions>
        </Menu>
      </View>

      <LineChart
        style={styles.chart}
        data={chartdata}
        width={scaleWidth(340)}
        height={scaleHeight(200)}
        chartConfig={chartConfig}
        withHorizontalLabels={true}
        withShadow={true}
        withInnerLines={true}
        formatXLabel={value => {
          // Assuming `value` is a number representing the year
          return value.toString(); // Convert the year to a string
        }}
        formatYLabel={value => {
          const absValue = Math.abs(value);

          if (absValue >= 1000000) {
            const suffix = value < 0 ? '-' : '';
            return `${suffix}${(absValue / 1000000).toFixed(1)}M`;
          } else if (absValue >= 1000) {
            const suffix = value < 0 ? '-' : '';
            return `${suffix}${(absValue / 1000).toFixed(1)}k`;
          }

          return value.toString();
        }}
      />
    </View>
  );
};

export default BalanceTrend;
