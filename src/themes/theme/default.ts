// types
import { PaletteThemeProps } from 'types/theme';
import { PalettesProps } from '@ant-design/colors';
import { PaletteColorOptions } from '@mui/material/styles';

// ==============================|| PRESET THEME - DEFAULT ||============================== //

export default function Default(colors: PalettesProps, mode: 'light' | 'dark' = 'light'): PaletteThemeProps {
  const { red, gold, cyan, green, grey } = colors;

  const customPurple = [
    '#f4f1fc', // 0 - lightest
    '#e4dcf7', // 1
    '#d4c7f2', // 2
    '#c4b2ed', // 3 - light
    '#9b7de0', // 4
    '#4b2e83', // 5 - main (UW Spirit Purple)
    '#3d2669', // 6 - dark
    '#2f1e4f', // 7
    '#211635', // 8 - darker
    '#130e1b' // 9 - darkest
  ];

  const customGold = [
    '#f8f6f2', // 0 - lightest
    '#f0ebdf', // 1
    '#e8e0cc', // 2
    '#e0d5b9', // 3 - light
    '#d0c193', // 4
    '#b7a57a', // 5 - main (UW Husky Gold)
    '#928462', // 6 - dark
    '#6e634a', // 7
    '#4a4231', // 8 - darker
    '#262119' // 9 - darkest
  ];

  const isLightMode = mode === 'light';
  const primaryColors = isLightMode ? customPurple : customGold;
  const secondaryColors = isLightMode ? customGold : customPurple;

  const greyColors: PaletteColorOptions = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16]
  };

  const contrastText = isLightMode ? '#fff' : '#000';
  const secondaryContrastText = isLightMode ? '#000' : '#fff';

  return {
    primary: {
      lighter: primaryColors[0],
      100: primaryColors[1],
      200: primaryColors[2],
      light: primaryColors[3],
      400: primaryColors[4],
      main: primaryColors[5],
      dark: primaryColors[6],
      700: primaryColors[7],
      darker: primaryColors[8],
      900: primaryColors[9],
      contrastText
    },
    secondary: {
      lighter: secondaryColors[0],
      100: secondaryColors[1],
      200: secondaryColors[2],
      light: secondaryColors[3],
      400: secondaryColors[4],
      main: secondaryColors[5],
      600: secondaryColors[6],
      dark: secondaryColors[7],
      800: secondaryColors[8],
      darker: secondaryColors[9],
      A100: secondaryColors[0],
      A200: secondaryColors[6],
      A300: secondaryColors[7],
      contrastText: secondaryContrastText
    },
    error: {
      lighter: red[0],
      light: red[2],
      main: red[4],
      dark: red[7],
      darker: red[9],
      contrastText
    },
    warning: {
      lighter: gold[0],
      light: gold[3],
      main: gold[5],
      dark: gold[7],
      darker: gold[9],
      contrastText: greyColors[100]
    },
    info: {
      lighter: cyan[0],
      light: cyan[3],
      main: cyan[5],
      dark: cyan[7],
      darker: cyan[9],
      contrastText
    },
    success: {
      lighter: green[0],
      light: green[3],
      main: green[5],
      dark: green[7],
      darker: green[9],
      contrastText
    },
    grey: greyColors
  };
}
