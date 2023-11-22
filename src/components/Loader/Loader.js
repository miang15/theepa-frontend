import {View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import theme from '../../utils/theme';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setAppLoading} from '../../redux/AppLoader/appLoaderAction';

const Loader = ({loader}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loadingReducer.loading);

  if (loading) {
    setTimeout(() => {
      dispatch(setAppLoading(false));
    }, 10000);
  }

  if (!loading) return <></>;
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={theme.white} size={'small'} />
    </View>
  );
};

export default Loader;
