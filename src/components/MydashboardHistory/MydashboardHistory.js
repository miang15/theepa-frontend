import {View, ScrollView, FlatList} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {optionsStyles, styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../CustomText/CustomText';
import theme from '../../utils/theme';
import {scaleHeight, scaleWidth} from '../../utils/Layout';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Checkbox} from 'react-native-paper';
import CustomProgress from '../CustomProgress/CustomProgress';
import moment from 'moment';
import TransactionCard from '../TransactionCard/TransactionCard';

const MydashboardHistory = ({progressData, hideshow, navigation, onPress}) => {
  const [checked, setChecked] = useState(false);
  const [allhistory, setallhistory] = useState([]);
  const [selected, setselected] = useState('All');
  const menuref = useRef();
  const data = ['Complete', 'Incomplete'];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomText numberOfLines={1} textStyle={styles.heading}>
          {'Recent Transanctions'}
        </CustomText>
        {hideshow ? null : (
          <CustomText onPress={onPress} textStyle={styles.more}>
            Show all
          </CustomText>
        )}
      </View>

      {progressData?.length ? (
        <FlatList
          data={progressData.slice(0, 4)}
          style={styles.history}
          renderItem={({item, index}) => {
            return (
              <TransactionCard
                Icon={item?.category?.icon || null}
                accountName={item?.accountID?.accountName}
                customview={{width: '100%'}}
                color={
                  item?.type == 'expense'
                    ? theme.redprimary
                    : theme.secondarylight
                }
                category={
                  item?.label
                    ? item?.label
                    : item?.goals
                    ? item?.goals?.name
                    : item?.category?.name
                    ? item?.category?.name
                    : 'Uncategorized'
                }
                amount={
                  item?.type == 'expense'
                    ? `- PKR ${item?.amount}`
                    : `+ PKR ${item?.amount}`
                }
                date={moment(item?.time).format('DD MMM, YY')}
                key={index}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>No History Available</CustomText>
      )}
    </View>
  );
};

export default MydashboardHistory;
