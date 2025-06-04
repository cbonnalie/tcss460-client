// next
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';

// ==============================|| LOGO ICON SVG ||============================== //

export default function LogoIcon() {
  const theme = useTheme();
  const logoIcon = theme.palette.mode === ThemeMode.DARK ? 'assets/images/dark-logo-icon.svg' : 'assets/images/light-logo-icon.svg';
  return <Image src={logoIcon} alt="UW" width={55} height={55} />;
}
