// material-ui
import { Theme } from '@mui/material/styles';
import { ThemeMode } from '../../config';

// ==============================|| OVERRIDES - TOGGLE BUTTON ||============================== //

export default function ToggleButton(theme: Theme) {
  return {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            borderColor: theme.palette.divider,
            color: theme.palette.text.disabled
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          },
          '&.MuiToggleButton-standard': {
            borderColor: theme.palette.mode === ThemeMode.DARK ? '#595959' : '#D9D9D9',
          },
        }
      }
    }
  };
}
