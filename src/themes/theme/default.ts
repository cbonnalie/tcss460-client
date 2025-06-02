// types
import { PaletteThemeProps } from 'types/theme';
import { PalettesProps } from '@ant-design/colors';
import { PaletteColorOptions } from '@mui/material/styles';

// ==============================|| PRESET THEME - DEFAULT ||============================== //

export default function Default(colors: PalettesProps): PaletteThemeProps {
  const { blue, red, gold, cyan, green, grey } = colors;

  const customPrimary = [
    '#f4f1fc',  // 0 - lightest
    '#e4dcf7',  // 1
    '#d4c7f2',  // 2
    '#c4b2ed',  // 3 - light
    '#9b7de0',  // 4
    '#4b2e83',  // 5 - main (UW Spirit Purple)
    '#3d2669',  // 6 - dark
    '#2f1e4f',  // 7
    '#211635',  // 8 - darker
    '#130e1b',  // 9 - darkest
  ];

  const customSecondary = [
    '#f8f6f2',  // 0 - lightest
    '#f0ebdf',  // 1
    '#e8e0cc',  // 2
    '#e0d5b9',  // 3 - light
    '#d0c193',  // 4
    '#b7a57a',  // 5 - main (UW Husky Gold)
    '#928462',  // 6 - dark
    '#6e634a',  // 7
    '#4a4231',  // 8 - darker
    '#262119',  // 9 - darkest
  ];

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
  const contrastText = '#fff';

  return {
    primary: {
      lighter: customPrimary[0],
      100: customPrimary[1],
      200: customPrimary[2],
      light: customPrimary[3],
      400: customPrimary[4],
      main: customPrimary[5],
      dark: customPrimary[6],
      700: customPrimary[7],
      darker: customPrimary[8],
      900: customPrimary[9],
      contrastText
    },
    secondary: {
      lighter: customSecondary[0],
      100: customSecondary[1],
      200: customSecondary[2],
      light: customSecondary[3],
      400: customSecondary[4],
      main: customSecondary[5],
      600: customSecondary[6],
      dark: customSecondary[7],
      800: customSecondary[8],
      darker: customSecondary[9],
      A100: customSecondary[0],
      A200: customSecondary[6],
      A300: customSecondary[7],
      contrastText: '#000'
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
