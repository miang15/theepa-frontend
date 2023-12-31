import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function reset(name, index) {
  navigationRef.current?.navigation.reset({
    index: index,
    routes: [{name}],
  });
}

export function goBack(name, params) {
  navigationRef.current?.goBack();
}
