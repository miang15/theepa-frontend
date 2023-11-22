import {View, ScrollView} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {optionsStyles, styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../CustomText/CustomText';
import theme from '../../utils/theme';
import {scaleHeight, scaleSize, scaleWidth} from '../../utils/Layout';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Checkbox} from 'react-native-paper';
import CustomProgress from '../CustomProgress/CustomProgress';
import {useSelector} from 'react-redux';
// import {PieChart} from 'react-native-chart-kit';
import {PieChart} from 'react-native-svg-charts';
import {expensedata} from '../../DummyData/DummyData';
import {getRandomColor, getRandomRelatedColor} from '../../constants/functions';
import {useNavigation} from '@react-navigation/native';

const ExpenseStructure = ({chartData, hideFilter, checked, setChecked}) => {
  const navigation = useNavigation();
  const allCategory = useSelector(state => state.DashboardReducer.category);
  const menuref = useRef();
  const data = ['Week', 'Month', 'Year'];
  const [mydata, setmyData] = useState([
    {
      value: 1,
      svg: {
        fill: theme.secondary,
      },
      key: `pie-1`,
      label: null,
    },
  ]);
  const [total, settotal] = useState('');
  const usedColors = [];

  // function getRandomColor() {
  //   let colorCode;

  //   do {
  //     colorCode = Math.floor(Math.random() * 16777215).toString(16);
  //     const paddedColorCode = colorCode.padStart(6, '0');
  //     const color = '#' + paddedColorCode;
  //     const isColorUsed = usedColors.includes(color);

  //     if (!isColorUsed) {
  //       usedColors.push(color);
  //       return color;
  //     }
  //   } while (true);
  // }

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146,1)`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  useEffect(() => {
    navigation.addListener('blur', () => {
      menuref?.current?.close();
    });
  }, []);

  useEffect(() => {
    if (chartData?.length) {
      let arr = [];

      const groupedData = chartData.reduce((result, item, index) => {
        if (item?.category?.name) {
          const existingItem = result.find(
            i => i?.label === item?.category?.name,
          );

          if (existingItem !== undefined) {
            result = result.map(obj =>
              obj?.label === item?.category?.name
                ? {...obj, value: obj?.value + item?.amount}
                : obj,
            );
          } else {
            const randomRelatedColor = getRandomRelatedColor();
            const graphColors = theme.graphcolors;
            result.push({
              value: item?.amount,
              svg: {
                fill: index < 5 ? graphColors[index] : randomRelatedColor,
              },
              key: `pie-${index}`,
              label: item?.category?.name,
            });
          }
        }
        return result;
      }, []);
      const totalValue = groupedData.reduce(
        (total, item) => total + item?.value,
        0,
      );

      settotal(totalValue);
      if (groupedData?.length) {
        setmyData(groupedData);
      } else {
        setmyData([
          {
            value: 1,
            svg: {
              fill: theme.secondary,
            },
            key: `pie-1`,
            label: null,
          },
        ]);
      }
    } else {
      setmyData([
        {
          value: 1,
          svg: {
            fill: theme.secondary,
          },
          key: `pie-1`,
          label: null,
        },
      ]);
    }
  }, [chartData]);

  const LegendComponent = ({data}) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{
          maxHeight: scaleHeight(200),
          overflow: 'hidden',
        }}
        contentContainerStyle={{
          width: scaleWidth(150),
        }}>
        {data.map((item, index) => (
          <View key={index} style={styles.list}>
            <View
              style={{...styles.circle, backgroundColor: item?.svg?.fill}}
            />
            {item?.label ? (
              <CustomText numberOfLines={1} textStyle={styles.label}>
                {`${((item?.value / total) * 100).toFixed()}% ${item?.label}`}
              </CustomText>
            ) : (
              <CustomText numberOfLines={1} textStyle={styles.label}>
                {`No Data`}
              </CustomText>
            )}
          </View>
        ))}
      </ScrollView>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomText numberOfLines={1} textStyle={styles.heading}>
          Expense Structure
        </CustomText>
        {hideFilter ? null : (
          <Menu ref={menuref}>
            <MenuTrigger>
              <AntDesign name="filter" size={22} color={theme.primary} />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {data?.map((item, index) => {
                  return (
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
                  );
                })}
              </ScrollView>
            </MenuOptions>
          </Menu>
        )}
      </View>
      {mydata?.length ? (
        <View style={styles.chartrow}>
          <PieChart
            style={styles.donut}
            innerRadius={scaleSize(35)}
            data={mydata}
            valueAccessor={({item}) => item.value}
          />
          <LegendComponent data={mydata} />
        </View>
      ) : (
        <CustomText textStyle={styles.nodata}>No Expense Available</CustomText>
      )}
    </View>
  );
};

export default ExpenseStructure;
