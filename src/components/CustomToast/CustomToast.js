import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

const CustomToast = () => {
  const toast = useSelector(state => state.loadingReducer.toast);

  useEffect(() => {
    if (!toast || !toast.showToast) return;
    else {
      return showMessage({
        message: toast.title,
        description: toast.description,
        type: toast.status,
        duration: 1500,
      });
    }
  }, [toast]);

  return <></>;
};

export default CustomToast;
