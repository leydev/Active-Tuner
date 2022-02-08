import type { PropsWithChildren, SVGAttributes } from 'react';

export interface SunProps {
  style?: SVGAttributes<SVGSVGElement>['style'];
  width?: SVGAttributes<SVGSVGElement>['width'];
  height?: SVGAttributes<SVGSVGElement>['height'];
  color?: SVGAttributes<SVGSVGElement>['fill']
}

export function Sun(props: PropsWithChildren<SunProps>) {
  const {
    style, width, height, color,
  } = props;
  return (
    <svg style={style} width={width} height={height} fill={color} viewBox="0 0 301 301" xmlns="http://www.w3.org/2000/svg">
      <path d="M256.833 106.504V44.1666H194.495L150.5 0.171143L106.505 44.1666H44.1667V106.504L0.171265 150.5L44.1667 194.495V256.833H106.505L150.5 300.829L194.495 256.833H256.833V194.495L300.829 150.5L256.833 106.504ZM230.25 183.463V230.25H183.463L150.5 263.213L117.537 230.25H70.75V183.463L37.7867 150.5L70.75 117.537V70.7499H117.537L150.5 37.7866L183.463 70.7499H230.25V117.537L263.213 150.5L230.25 183.463ZM150.5 70.7499C106.505 70.7499 70.75 106.504 70.75 150.5C70.75 194.495 106.505 230.25 150.5 230.25C194.495 230.25 230.25 194.495 230.25 150.5C230.25 106.504 194.495 70.7499 150.5 70.7499ZM150.5 203.667C121.125 203.667 97.3333 179.874 97.3333 150.5C97.3333 121.125 121.125 97.3332 150.5 97.3332C179.875 97.3332 203.667 121.125 203.667 150.5C203.667 179.874 179.875 203.667 150.5 203.667Z" fill={color} />
    </svg>

  );
}

Sun.defaultProps = {
  color: '#000',
  width: '25px',
  height: '25px',
};

export default Sun;
