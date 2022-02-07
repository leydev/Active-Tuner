import type { PropsWithChildren } from 'react';
import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import { Theme } from '@/store/enums';

export interface LogoProps {
  theme: Theme
}

function Logo(props: PropsWithChildren<LogoProps>) {
  const { theme } = props;

  return (
    <div className="fixed top-4 left-4">
      {theme === Theme.DARK
        ? (<img src={logoDark} width="80px" alt="Active Tuner" />)
        : (<img src={logoLight} width="80px" alt="Active Tuner" />)}
    </div>
  );
}

export default Logo;
