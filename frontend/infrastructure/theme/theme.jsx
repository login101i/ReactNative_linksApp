import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const colors = {
  primary: '#7F5DF0', // Light purple
  secondary: '#5D2DFD', // Dark purple

  white: 'white',
  black: '#000000',
  blackSpace: '#242423',
  red2: '#961d33',
  gray: '#a3a2a2',
  darkGray: '#8f9494',
  lightGray: '#dbdbdb',
  lightGray1: '#f5f6fa',
  allegroColor: '#ff5a00',
  linkColor: '#00a790',
  backgroundColor: '#36322b',
  backgroundColorFaded: '#33302b',
  yellow: '#e8f222',
  pink: '#da50f2',
  lightBlue: '#2291f2',
  greenBlue: '#11b9bf',
  purple: '#ff7b25',
  red: 'red',
  green: 'green',
  lightGrey: '#f8f4f4',
  dark: '#0c0c0c',
  medium: 'green',
  grey: 'grey',
  fbColor: '#3b5998',
  twitterColor: '#1DA1F2',
  orange: 'orange',

  brand: {
    primary: '#2182BD',
    secondary: '#5282BD',
    muted: '#C6DAF7'
  },
  ui: {
    primary: '#262626',
    secondary: '#yello',
    tertiary: '#F1F1F1',
    quaternary: '#FFFFFF',
    disabled: '#DEDEDE',
    error: '#D0421B',
    success: '#138000'
  },
  bg: {
    primary: '#FFFFFF',
    secondary: '#F1F1F1'
  },
  text: {
    primary: '#262626',
    secondary: '#757575',
    disabled: '#9C9C9C',
    inverse: '#FFFFFF',
    error: '#D0421B',
    success: '#138000'
  }
};
export const fonts = {
  body: 'Oswald_400Regular',
  heading: 'Lato_400Regular',
  monospace: 'Oswald_400Regular'
};

export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700
};

export const fontSizes = {
  caption: '12px',
  button: '14px',
  body: '16px',
  title: '20px',
  h5: '24px',
  h4: '34px',
  h3: '45px',
  h2: '56px',
  h1: '112px'
};

export const lineHeights = {
  title: '28px',
  copy: '20px'
};

export const sizes = ['8px', '16px', '32px', '64px', '128px'];

export const space = ['0px', '4px', '8px', '16px', '32px', '64px'];

const appTheme = {
  colors,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  space
};

export default appTheme;
