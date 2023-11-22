import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const theme = {
  primary: '#02457A',
  primarylight: '#018ABE',
  secondary: '#08979D',
  secondarylight: '#96F2D7',
  brightgreen: '#38D9A9',
  offwhite: '#F6F6F6',
  white: '#FFFFFF',
  black: '#000',
  darkestgray: '#363636',
  lightgrey: '#C5C5C5',
  redprimary: '#F03E3E',
  red: 'red',
  blue: '#2B78E4',
  skyblue: '#6091BA',
  gray: '#9F9FA0',
  purple: '#8E7CB9',
  lightgray: '#DFDDE4',
  green: '#009E11',

  // gradient
  gradientcolors: ['#96F2D7', '#018ABE'],
  alertgradient: ['#96F2D7', '#F03E3E'],
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},

  graphcolors: ['#02457A', '#08979D', '#96F2D7', '#38D9A9', '#A5D8FF'],

  wp,
  hp,
  opacity: 0.7,
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  montbold: 'Mont-Bold',
  montextralight: 'Mont-ExtraLight',
  montlight: 'Mont-Light',
  montregular: 'Mont-Regular',
  montsemibold: 'Mont-SemiBold',
  montthin: 'Mont-Thin',

  sandbold: 'Quicksand-Bold',
  sandlight: 'Quicksand-Light',
  sandmedium: 'Quicksand-Medium',
  sandregular: 'Quicksand-Regular',
  sandsemibold: 'Quicksand-SemiBold',
};

export default theme;

// appcenter codepush release-react -a nouman.saeed-approcket.co/Theepa -d Development
