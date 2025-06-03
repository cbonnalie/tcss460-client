// material-ui
import { alpha, Theme } from '@mui/material/styles';

// project import
import getColors from 'utils/getColors';

// types
import { ExtendedStyleProps } from 'types/extended';

// ==============================|| ALERT - COLORS ||============================== //

function getColorStyle({ color, theme }: ExtendedStyleProps) {
  const colors = getColors(theme, color);
  const { lighter, light, main, dark } = colors;
  const isLightMode = theme.palette.mode === 'light';

  return {
    borderColor: alpha(isLightMode ? dark : light, 0.5),
    backgroundColor: isLightMode ? light : lighter,
    color: isLightMode ? theme.palette.common.black : theme.palette.common.white,
    '& .MuiAlert-icon': {
      color: isLightMode ? theme.palette.common.black : theme.palette.common.white,
    }
  };
}

// ==============================|| OVERRIDES - ALERT ||============================== //

export default function Alert(theme: Theme) {
  const primaryDashed = getColorStyle({ color: 'primary', theme });

  return {
    MuiAlert: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          fontSize: '0.875rem',
          marginBottom: theme.spacing(2)
        },

        standardSuccess: getColorStyle({ color: 'success', theme }),
        standardError: getColorStyle({ color: 'error', theme }),
        standardWarning: getColorStyle({ color: 'warning', theme }),
        standardInfo: getColorStyle({ color: 'info', theme }),

        icon: {
          fontSize: '1rem'
        },
        message: {
          padding: 0,
          marginTop: 3,
        },
        filled: {
          color: theme.palette.grey[0]
        },
        border: {
          padding: '10px 16px',
          border: '1px solid',
          ...primaryDashed,
          '&.MuiAlert-borderPrimary': getColorStyle({ color: 'primary', theme }),
          '&.MuiAlert-borderSecondary': getColorStyle({ color: 'secondary', theme }),
          '&.MuiAlert-borderError': getColorStyle({ color: 'error', theme }),
          '&.MuiAlert-borderSuccess': getColorStyle({ color: 'success', theme }),
          '&.MuiAlert-borderInfo': getColorStyle({ color: 'info', theme }),
          '&.MuiAlert-borderWarning': getColorStyle({ color: 'warning', theme })
        },
        action: {
          '& .MuiButton-root': {
            padding: 2,
            height: 'auto',
            fontSize: '0.75rem',
            marginTop: -2
          },
          '& .MuiIconButton-root': {
            width: 'auto',
            height: 'auto',
            padding: 2,
            marginRight: 6,
            '& .MuiSvgIcon-root': {
              fontSize: '1rem'
            }
          }
        }
      }
    }
  };
}
