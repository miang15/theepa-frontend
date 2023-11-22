import {Dimensions, PixelRatio} from 'react-native';

const ACTUAL_SCREEN_WIDTH = Dimensions.get('window').width;
const ACTUAL_SCREEN_HEIGHT = Dimensions.get('window').height;

const SCREEN_WIDTH =
  ACTUAL_SCREEN_WIDTH < ACTUAL_SCREEN_HEIGHT
    ? ACTUAL_SCREEN_WIDTH
    : ACTUAL_SCREEN_HEIGHT;
const SCREEN_HEIGHT =
  ACTUAL_SCREEN_WIDTH < ACTUAL_SCREEN_HEIGHT
    ? ACTUAL_SCREEN_HEIGHT
    : ACTUAL_SCREEN_WIDTH;

const BASE_WIDTH = 392;
const BASE_HEIGHT = 753;

export const scaleWidth = width => width * (SCREEN_WIDTH / BASE_WIDTH);

export const widthPercentage = width => `${(width / BASE_WIDTH) * 100}%`;

export const scaleHeight = height => height * (SCREEN_HEIGHT / BASE_HEIGHT);

export const scaleSize = size =>
  size * ((SCREEN_WIDTH + SCREEN_HEIGHT) / (BASE_WIDTH + BASE_HEIGHT));

export const scaleFont = fontSize =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      fontSize * ((SCREEN_WIDTH + SCREEN_HEIGHT) / (BASE_WIDTH + BASE_HEIGHT)),
    ),
  );

function dimensions(top = 0, right = 0, bottom = 0, left = 0, property) {
  let styles = {};
  styles[`${property}Top`] = scaleHeight(top);
  styles[`${property}Right`] = scaleWidth(right);
  styles[`${property}Bottom`] = scaleHeight(bottom);
  styles[`${property}Left`] = scaleWidth(left);
  return styles;
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(
  color,
  offset = {height: 3, width: 2},
  radius = 6,
  opacity = 1,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
