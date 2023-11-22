import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const BASE_WIDTH = 392;

const useFlexibleDimensions = () => {
  const [windowDimensionsWidth, setWindowDimensionsWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setWindowDimensionsWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const scaleWidth = width => width * (windowDimensionsWidth / BASE_WIDTH);

  return [scaleWidth];
};

export default useFlexibleDimensions;
