'use client';

// next
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';

// ==============================|| LOGO SVG ||============================== //

export default function LogoMain({ reverse }: { reverse?: boolean }) {
  const theme = useTheme();
  const logo = theme.palette.mode === ThemeMode.DARK ? 'assets/images/dark-mode-logo.svg' : 'assets/images/light-mode-logo.svg';

  return <Image src={logo} alt="TCSS 460" width={200} height={34} />;
}
